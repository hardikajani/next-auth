'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';




const VarifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  
  // const router = useRouter()
  // const urlToken = router.query.token?.toString();
  // setToken(urlToken || "");

  const veridyUserEmai = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {token})
      console.log(response.data)
      setVerified(true)
    } catch (error:any) {
      setError(true)
      console.log(error.massage)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [])


  useEffect(() => {
    if(token.length > 0){
      veridyUserEmai();
      setError(false)
    } 
  }, [token])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href='/login' >Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error  for Verifying Email</h2>
        </div>
      )}

    </div>
  )
}

export default VarifyEmailPage;