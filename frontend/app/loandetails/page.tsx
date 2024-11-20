
"use client"
import { useState, useEffect } from "react";
import React from "react";
import { useUser } from '../context/userContext'
import { useRouter } from "next/navigation";
import NoAccess from "../_components/onaccess";
import Header from "../_components/header";
import axios from "axios";

const LoanDetails: React.FC = () => {
    const { email, token, setToken } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loanDetails, setLoanDetails] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);

                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/loan/email/${email}`
                    );

                    setLoanDetails(response.data.loan);
                } else {
                    router.push("/login");
                }
            } catch (err) {
                setError("Failed to fetch loan details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanDetails();
    }, [router, setToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            {token ? (
                <div className="container mx-auto mt-10 p-4">
                    <h1 className="text-2xl font-bold mb-6">Loan Details</h1>
                    {error ? (
                        <div className="text-red-500">{error}</div>
                    ) : loanDetails ? (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex items-center mb-4 space-x-2">
                                <div className="font-bold text-xl">{loanDetails.name}</div>
                                <div
                                    className={`px-2 py-1 rounded text-white ${loanDetails.loanstatus === "approved"
                                        ? "bg-green-500"
                                        : loanDetails.loanstatus === "pending"
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                        }`}
                                >
                                    {loanDetails.loanstatus}
                                </div>
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Email:</strong> {loanDetails.email}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Phone:</strong> {loanDetails.phone}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Loan Amount:</strong> ${loanDetails.loanamount}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Loan Type:</strong> {loanDetails.loantype}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Loan Plan:</strong> {loanDetails.loanplan}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <strong>Date of Apply:</strong> {new Date(loanDetails.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ) : (
                        <div>No loan details available.</div>
                    )}
                </div>
            ) : (
                <NoAccess />
            )}
        </div>
    );
};

export default LoanDetails;
