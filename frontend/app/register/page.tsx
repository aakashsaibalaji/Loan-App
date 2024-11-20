"use client"
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "../_components/header";
import axios from 'axios';
interface FormData {
    fullname: string
    username: string
    email: string
    password: string
}
const Register: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const storing = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`,
                {
                    fullname: formData.fullname,
                    username: formData.username,
                    email: formData.email,

                })
            if (storing.status === 200) {
                const response = await createUserWithEmailAndPassword(formData.email, formData.password);
                if (response?.user.getIdToken) {
                    toast.success("Register Sucessfully");
                    router.push("/login");
                    setLoading(false);
                    setFormData({
                        fullname: "",
                        username: "",
                        email: "",
                        password: ""
                    })
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.warning("something went wrong");
        }
    }
    return (
        <div>
            <Header />
            <div className="w-full max-w-md mx-auto rounded-md p-6 md:p-8 lg:max-w-lg drop-shadow-x mt-10">
                <Card className="bg-white dark:bg-gray-800 transition duration-300">
                    <CardHeader className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Register
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="w-full">
                                <Input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                            </div>
                            <div className="w-full">
                                <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                            </div>
                            <div className="w-full">
                                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                            </div>
                            <div className="w-full">
                                <Input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
                            </div>
                            <div className="flex flex-col items-center space-y-4 w-full">
                                {loading ? (<div>Loading ...</div>) : (<Button type="submit" className="w-full dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 mx:w-auto text-center"> Register </Button>)}
                                {/* <Button type="submit" className="w-full dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 mx:w-auto text-center"> Register </Button> */}
                                <div className="text-sm text-center text-gray-900 dark:text-gray-100"> <strong><Link href="/login" className="text-blue-500 hover:underline dark:text-blue-400">Login</Link></strong>, if you already have an account </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Register;