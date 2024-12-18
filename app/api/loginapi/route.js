import createUser from '@/models/usermodel';
import connectDb from '../../../lib/db';
import { NextResponse } from 'next/server';
import  jwt  from 'jsonwebtoken';

export async function POST(req, res) {
  try {
    await connectDb(); // Establish the DB connection
    const { email, password } = await req.json()

    if(!email || !password){
      return NextResponse.json({ message: 'Email password is necessary', status: 404 })
    }

    const isUser = await createUser.findOne({ email })
    if (!isUser || isUser.length == 0) {
      return NextResponse.json({ message: 'User Not Found Please Signup', status: 404 })
    }
    if (isUser.password !== password) {
      return NextResponse.json({ message: 'Incorrect Password', status: 400 })
    }
    const jwtToken = process.env.JWT_TOKEN
    if (!jwtToken) {
      return NextResponse.json({ message: 'Please give a jwt token', status: 400 })
    }
    const token = jwt.sign({ id: isUser._id, email: email }, jwtToken, {
      expiresIn: '1h'
    })
    return NextResponse.json({ token ,status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error, status: 500 })
  }
}
