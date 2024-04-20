import {connectDB} from '@/dbconfig/dbconfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/model/userModel';
import { NextRequest, NextResponse } from 'next/server';


connectDB()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    });

export async function POST(request:NextRequest){
    //extract data from Token

    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
    
        if(!user){
            return NextResponse.json({error: "Invalid token"},
                    {status: 400}
                )
        }
        return NextResponse.json({
            message: "User found",
            data: user
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
        
    }
}