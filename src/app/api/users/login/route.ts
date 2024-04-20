import {connectDB} from '@/dbconfig/dbconfig';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/helpers/mailer';


connectDB()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    });

export async function POST(request:NextRequest){
    try {
        
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "user does not exists"},
                {status: 400}
            )
        }
        if (!user.isVarified) {
            await sendEmail({email, emailType: "VARIFY", userId: user._id})
            return NextResponse.json({ error: 'Please check your email and verify your account' }, { status: 400 })
          }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Check your credentials"},
            {status: 400}
            )
         
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
        

    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}