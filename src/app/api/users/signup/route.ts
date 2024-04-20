import {connectDB} from '@/dbconfig/dbconfig'
import User from '@/model/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'

connectDB()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json(
                { error: 'User already exists'},
                {status: 400}
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        // send email to user
        await sendEmail({email, emailType: "VARIFY", userId: savedUser._id})


        return NextResponse.json({ 
                message: 'User created successfully',
                success: true,
                savedUser
            },
            {status: 200}
        )

    } catch (error:any) {
        return NextResponse.json(
            { error: error.message}, 
            {status: 500}
        )
    }
    
}
