"use client"
import Layout from "./_components/layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShieldCheck, Clock, TrendingUp } from 'lucide-react'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartApplication = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4 text-white">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Quick and Easy Loan Applications
                    </h1>
                    <div className="max-w-[600px] text-gray-200 md:text-xl">
                      Get the financial boost you need with our streamlined loan application process. Apply now and receive a decision in minutes.
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      onClick={handleStartApplication}
                    >
                      Start Your Application
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-black hover:bg-white hover:text-blue-600"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Why Choose Us
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <ShieldCheck className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Secure Process</h3>
                    <div className="text-gray-500">
                      Your data is protected with bank-level security throughout the application process.
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <Clock className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Fast Approval</h3>
                    <div className="text-gray-500">
                      Get a decision on your loan application in minutes, not days.
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <TrendingUp className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Competitive Rates</h3>
                    <div className="text-gray-500">
                      We offer some of the most competitive interest rates in the market.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ready to Get Started Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <div className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Apply now and take the first step towards achieving your financial goals. Our team is here to help you every step of the way.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}



