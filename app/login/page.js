'use client'
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";

function LoginForm() {
  // Use state to store email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password state
  };

  // Handle form submit (login)
  const handleSignin = async () => {
    try {
      const data = await fetch('/api/loginapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to API
      });
      const res = await data.json();
      if(res.status === 200){
        localStorage.setItem('token',res.token)
        return router.push('/dashboard')
      }
      else{
        alert(res.message)
      }

    } catch (error) {
       console.log(error)
    }

  };

  return (
    <div className="flex items-center h-[100vh]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email} // Bind the email input to state
                onChange={handleEmailChange} // Call the onChange handler
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password} // Bind the password input to state
                onChange={handlePasswordChange} // Call the onChange handler
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white"
              onClick={handleSignin} // Trigger the signin function
              disabled={!email || !password}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
