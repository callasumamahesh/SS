import connectDb from "@/lib/db";
import createUser from "../../../models/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDb();

    try {
        // Parse the request body
        const { email, password, confirmPassword } = await req.json();

        // Check if the email already exists
        const emailExists = await createUser.findOne({ email });
        if (emailExists) {
            return NextResponse.json(
                { message: "User already exists." },
                { status: 400 }
            );
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match." },
                { status: 400 }
            );
        }

        // Create a new user
        const createNewUser = await createUser.create({
            email,
            password,
            confirmPassword,
        });

        return NextResponse.json(
            { message: "User created successfully.", user: createNewUser },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error while creating user.", error: error.message },
            { status: 500 }
        );
    }
}
