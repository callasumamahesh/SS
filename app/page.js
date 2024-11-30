import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus, TrendingUp, ChevronRight, MessageCircleQuestion } from "lucide-react"
import mainImage from '../assets/img/mainIcon.webp'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Login and Signup Buttons */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">SmartSpender</h1>
          </div>
          <div className="flex space-x-2">
            {/* Desktop Buttons */}
            <Link href='/login'>
              <Button
                className="hidden md:inline-flex hover:bg-primary/10 transition-colors duration-300"
              >
                <LogIn className="mr-2 h-4 w-4 text-primary" />
                Login
              </Button>
            </Link>

            <Link href='/signup'>
            <Button
              className="hidden md:inline-flex border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
            >
              <UserPlus className="mr-2 h-4 w-4 text-primary group-hover:rotate-6 transition-transform" />
              Sign Up
            </Button>
            </Link>

            {/* Mobile Icons */}
            <div className="md:hidden flex space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary/10 transition-colors duration-300"
              >
                <LogIn className="h-4 w-4 text-primary" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
              >
                <UserPlus className="h-4 w-4 text-primary group-hover:rotate-6 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8 lg:py-16">
        <Card className="w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl font-extrabold text-foreground">
                  SmartSpender: Your Smart Expense Tracker
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                <p className="text-lg text-muted-foreground">
                  Manage your finances effortlessly with SmartSpender, the ultimate tool for tracking and analyzing your expenses.
                  Categorize spending on food, hostel, clothing, entertainment, and more, and visualize it all with intuitive pie charts.
                </p>
                <p className="text-lg text-muted-foreground">
                  Get clear insights into your spending habits, identify areas to save, and set smarter financial goals.
                  Whether you are cutting unnecessary costs or boosting savings, SmartSpender is your trusted partner for financial clarity.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    className="w-full sm:w-auto group"
                    variant="default"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto group border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <MessageCircleQuestion className="mr-2 h-4 w-4 text-primary group-hover:rotate-6 transition-transform" />
                    Speak to Sales
                  </Button>
                </div>
              </CardContent>
            </div>

            {/* Image Section */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center p-6">
              <Image
                src={mainImage}
                alt="Expense Tracking Visualization"
                width={400}
                height={400}
                priority
                className="w-full max-w-md h-auto object-contain rounded-sm shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default HomePage