"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";

interface LoanProps {
    value: string;
}

const LoanForm: React.FC<LoanProps> = ({ value }) => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        loanAmount: 0,
        loanType: value,
        weeklyPlan: 0,
    });

    const [loanWeekPlans] = useState([
        { loanPlanId: 1, noOfWeeks: 4 },
        { loanPlanId: 2, noOfWeeks: 8 },
        { loanPlanId: 3, noOfWeeks: 12 },
        { loanPlanId: 4, noOfWeeks: 16 },
    ]);

    const handleonChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.fullname || !formData.loanAmount || !formData.loanType || !formData.phone || !formData.weeklyPlan) {
                toast.warn("Please fill all the Fields to Submit");
                return;
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loan/`, {
                name: formData.fullname,
                email: formData.email,
                phone: formData.phone,
                loanamount: formData.loanAmount,
                loantype: formData.loanType,
                loanplan: formData.weeklyPlan + " Weeks",
            })
            if (response.status === 200) {
                toast.success("Loan Application Successful");
                setFormData({
                    fullname: "",
                    email: "",
                    phone: "",
                    loanAmount: 0,
                    loanType: formData.loanType,
                    weeklyPlan: 0,
                });
            }
        }
        catch (error) {
            console.log(error);
            toast.warn("Please check if our already Applied for loan");
        }
    };

    const ShowingWeekSplit: React.FC<{ weeks: number; Amount: number }> = ({
        weeks,
        Amount,
    }) => {
        const weeklyAmount = Amount / weeks;
        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: weeks }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i * 7);
                    return (
                        <div
                            key={i}
                            className="border rounded p-2 text-xs text-gray-700 bg-gray-50 shadow-sm"
                        >
                            <div>Week {i + 1}</div>
                            <div>{date.toLocaleDateString()}</div>
                            <div>${weeklyAmount.toFixed(2)}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 mt-8 mb-8">
            <Card className="max-w-3xl w-full shadow-lg rounded-lg">
                <CardHeader className="bg-primary text-white p-4 rounded-t-lg">
                    <CardTitle className="text-lg font-semibold">Loan Application {value}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <Label htmlFor="fullname" className="font-medium text-sm text-gray-700">
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                placeholder="Enter your full name"
                                onChange={handleonChange}
                                className="mt-1"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <Label htmlFor="email" className="font-medium text-sm text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleonChange}
                                className="mt-1"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <Label htmlFor="phone" className="font-medium text-sm text-gray-700">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                placeholder="Enter your phone number"
                                onChange={handleonChange}
                                className="mt-1"
                            />
                        </div>

                        {/* Loan Amount */}
                        <div className="flex flex-col">
                            <Label htmlFor="loanAmount" className="font-medium text-sm text-gray-700">
                                Loan Amount
                            </Label>
                            <Input
                                id="loanAmount"
                                type="number"
                                name="loanAmount"
                                value={formData.loanAmount}
                                placeholder="Enter loan amount"
                                onChange={handleonChange}
                                className="mt-1"
                            />
                        </div>

                        {/* Loan Type */}
                        <div>
                            <Label className="font-medium text-sm text-gray-700">Loan Type</Label>
                            <div className="border rounded-md px-3 py-2 mt-1 bg-gray-50 text-gray-700">
                                {formData.loanType}
                            </div>
                        </div>

                        {/* Loan Plan */}
                        <div>
                            <Label className="font-medium text-sm text-gray-700">Select the Plan for Loan</Label>
                            {loanWeekPlans.map((item) => (
                                <div
                                    key={item.loanPlanId}
                                >
                                    <div className="mt-3 flex flex-col items-center gap-4 bg-gray-50 p-2 rounded-md border">
                                        <Label htmlFor={`loanPlan-${item.loanPlanId}`} className="text-gray-700">
                                            {item.noOfWeeks} weeks Plan
                                        </Label>
                                        <Input
                                            type="radio"
                                            id={`loanPlan-${item.loanPlanId}`}
                                            name="weeklyPlan"
                                            value={item.noOfWeeks}
                                            onChange={handleonChange}
                                            className="form-radio"
                                        />
                                    </div>
                                    <div>
                                        {Number(formData.weeklyPlan) === item.noOfWeeks && (
                                            <ShowingWeekSplit
                                                weeks={item.noOfWeeks}
                                                Amount={formData.loanAmount}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark shadow-md"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoanForm;




