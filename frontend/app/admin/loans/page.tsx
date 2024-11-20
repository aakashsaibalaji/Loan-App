"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/navigation";
import NoAccess from "../../_components/onaccess";
import Layout from "../../_components/layout";
import axios from "axios";
import { toast } from "react-toastify";

interface Loan {
    _id: number;
    name: string;
    email: string;
    phone: string;
    loanamount: number;
    loantype: string;
    loanstatus: string;
    loanplan: string;
    createdAt: string;
    updatedAt: string;
}

const Loans: React.FC = () => {
    const { email, token, setToken } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loans, setLoans] = useState<Loan[]>([]);
    const isAdmin = email === "admin@gmail.com";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                router.push("/login");
            }
            setLoading(false);
        }
    }, [router, setToken]);

    const fetchLoans = async () => {
        try {
            const response = await axios.get<Loan[]>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/loan/all`
            );
            if (response.status === 200) {
                setLoans(response.data);
            }
        } catch (error) {
            console.error("Error fetching loans:", error);
            toast.warn("Something went wrong with the backend server.");
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchLoans();
        }
    }, [isAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            {isAdmin ? (
                token ? (
                    <div className="container mx-auto py-8 px-4">
                        <h1 className="text-2xl font-bold mb-6">Loan Applications</h1>
                        {loans.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Loan Amount</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Loan Type</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Loan Plan</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loans.map((loan, index) => (
                                            <tr
                                                key={loan._id}
                                                className="even:bg-gray-50 hover:bg-gray-100"
                                            >
                                                <td className="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.name}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.email}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.phone}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.loanamount}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.loantype}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">{loan.loanplan}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">
                                                    <div
                                                        className={`px-2 py-1 rounded text-white ${loan.loanstatus === "approved"
                                                            ? "bg-green-500"
                                                            : loan.loanstatus === "Pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                            }`}
                                                    >
                                                        {loan.loanstatus}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-left">
                                                    {new Date(loan.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No loan applications found.</p>
                        )}
                    </div>
                ) : (
                    <NoAccess />
                )
            ) : (
                <NoAccess />
            )}
        </Layout>
    );
};

export default Loans;

