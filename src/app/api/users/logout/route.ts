import {connectDB} from '@/dbconfig/dbconfig';
import { NextRequest, NextResponse } from 'next/server';


connectDB()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    });

export async function POST(request:NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;


        
    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}