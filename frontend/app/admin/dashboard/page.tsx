"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/navigation";
import Header from "../../_components/header";
import axios from "axios";
import { toast } from "react-toastify";
import NoAccess from "../../_components/onaccess";


interface Loan {
    _id: string;
    name: string;
    email: string;
    phone: string;
    loanamount: number;
    loantype: string;
    loanplan: string;
    loanstatus: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
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

    const fetchPendingLoans = async () => {
        try {
            const response = await axios.get<Loan[]>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/loan/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setLoans(response.data);
            }
        } catch (error) {
            console.error("Error fetching loans:", error);
            toast.warn("Something went wrong while fetching loans.");
        }
    };

    const updateLoanStatus = async (id: string, loanStatus: string) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/loan/${id}/status`,
                { loanStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Loan status updated successfully.");
                fetchPendingLoans(); // Refresh the list after updating
            }
        } catch (error) {
            console.error("Error updating loan status:", error);
            toast.error("Failed to update loan status.");
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchPendingLoans();
        }
    }, [isAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            {isAdmin ? (
                token ? (
                    <div className="container mx-auto py-8">
                        {loans.length > 0 ? (
                            <div>
                                <div className="overflow-x-auto mt-4 mx-10">
                                    <h1 className="text-2xl font-bold mb-6">Loan Dashboard</h1>
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2">#</th>
                                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                                <th className="border border-gray-300 px-4 py-2">Loan Amount</th>
                                                <th className="border border-gray-300 px-4 py-2">Loan Type</th>
                                                <th className="border border-gray-300 px-4 py-2">Loan Plan</th>
                                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                                                <th className="border border-gray-300 px-4 py-2">Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loans.map((loan, index) => (
                                                <tr key={loan._id} className="even:bg-gray-50 hover:bg-gray-100">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.email}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.phone}</td>
                                                    <td className="border border-gray-300 px-4 py-2">${loan.loanamount}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.loantype}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.loanplan}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{loan.loanstatus}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2 mb-2"
                                                            onClick={() => updateLoanStatus(loan._id, "approved")}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                                            onClick={() => updateLoanStatus(loan._id, "decline")}
                                                        >
                                                            Decline
                                                        </button>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {new Date(loan.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No pending loan applications found.</p>
                        )}
                    </div>
                ) : (
                    <NoAccess />
                )
            ) : (
                <NoAccess />
            )}
        </div>
    );
};

export default AdminDashboard;

