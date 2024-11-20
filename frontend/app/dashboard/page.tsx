'use client'
import React, { useState, useEffect } from 'react'
import { CreditCard, Home, Car, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from '../context/userContext'
import { useRouter } from "next/navigation";
import Layout from '../_components/layout'
import NoAccess from '../_components/onaccess'
import LoanForm from '../_components/loanForm'

export default function LoanDashboard() {
    const [selectedItem, setSelectedItem] = useState<string>('');
    const { token, setToken } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            } else {
                router.push('/login');
            }
            setLoading(false);
        }
    }, [router, setToken]);

    const items = [
        { id: 1, value: 'personal', label: 'Personal Loan', icon: CreditCard },
        { id: 2, value: 'mortgage', label: 'Mortgage', icon: Home },
        { id: 3, value: 'auto', label: 'Auto Loan', icon: Car },
        { id: 4, value: 'business', label: 'Business Loan', icon: Briefcase },
    ];

    return (
        <Layout>
            {token ? (
                <div className="">
                    <div className="flex flex-wrap gap-4 mx-4 justify-center mt-4 shadow-sm mb-2">
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                className={`cursor-pointer transition-all rounded-lg shadow-md hover:shadow-lg p-4 border ${selectedItem === item.value
                                    ? 'ring-2 ring-primary border-primary'
                                    : 'border-gray-300'
                                    } w-full sm:w-[48%] md:w-[32%] lg:w-[22%]`}
                                onClick={() => setSelectedItem(item.value)}
                            >
                                <CardHeader className="flex flex-col items-center justify-center space-y-2">
                                    <item.icon className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-sm font-medium text-center">{item.label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className={`text-xs text-center ${selectedItem === item.value ? 'text-primary' : ''
                                            }`}
                                    >
                                        {selectedItem === item.value && 'Selected'}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="w-full">
                        {selectedItem && <LoanForm key={selectedItem} value={selectedItem} />}
                    </div>
                </div>
            ) : (
                <NoAccess />
            )}
        </Layout>
    );
}



