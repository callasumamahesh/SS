'use client'
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ToastContainer, toast } from "react-toastify"
import { Loader2 } from "lucide-react"

function LoginForm() {
  // Define state for form inputs
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [signupLoading, setSignupLoading] = useState(false)

  // Handle input change for each field
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the state based on input name
    }))
  }

  // Optional: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSignupLoading(true)
    if (data.password !== data.confirmPassword) {
      setSignupLoading(false)
      return toast.error('Password Does not match')
    }
    try {
      const sendingData = await fetch('/api/signupapi', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ ...data })
      })
      const res = await sendingData.json()
      if (res) {
        toast.success(res.message);
      }
      else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setSignupLoading(false)
    }

  }

  return (
    <div className="flex items-center h-[100vh]">
      <ToastContainer />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email and password below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <Button type="submit" disabled={signupLoading || !data.email || !data.password || !data.confirmPassword} className="w-full bg-black text-white">
                {signupLoading && <Loader2 className='ml-2 animate-spin' />}
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already a user?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
