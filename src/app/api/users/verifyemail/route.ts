import {connectDB} from '@/dbconfig/dbconfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'

connectDB()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })

export async function POST(request:NextRequest){
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody;

        console.log(token);

         const user = await User.findOne({varifyToken: token, varifyTokenExpiry: {$gt: Date.now()}})

         if(!user){
            return NextResponse.json({error: "Invalid token"},
                {status: 400}
            )
         }
         console.log(user)

         user.isVarified = true
         user.varifyToken = undefined
         user.varifyTokenExpiry = undefined

         await user.save()

         return NextResponse.json({
            message: "user verify successfully",
            success: true
            },
            {status: 201}
         )



    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}