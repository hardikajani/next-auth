'use client'

import React, { useEffect, useState } from 'react'
import eye from '@/assets/eye.svg'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [buttonDisable, setButtonDesable] = useState(false)  
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const submitForm = async ()=>{
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', formData);
      console.log(response.data);
      setLoading(false);
      localStorage.setItem('isAuthor', "true");
      router.push('/profile')
    } catch (error:any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if(formData.email.length < 0 || formData.password.length < 0)
      {
        setButtonDesable(true)
      }
  },[formData])


  return (
    <div className="flex justify-center items-center mt-10 ">
      <div className='w-full max-w-max text-left'>
        <div className="w-full border border-solid border-zinc-100 rounded-[30px] max-md:pl-0 max-md:max-w-full">
          <div className="flex flex-col md:flex-row max-sm:w-auto">
            <div className="flex flex-col px-10 py-5 w-full max-md:max-w-full order-2 md:order-1">
              <div className="flex flex-col self-stretch max-md:mt-0 max-md:max-w-full">
                <div className="text-base leading-8 text-zinc-400 max-md:max-w-full">
                  {loading ? 'Loading...' : 'Login with your email'}
                </div>
                
                <div className="mt-5 text-sm font-medium leading-7 text-zinc-400 max-md:max-w-full">
                  Email
                </div>
                <input
                  type='email'
                  className="items-start mt-2 ml-2 px-2 py-3 bg-black/0  rounded border-b border-solid border-b-zinc-100 text-zinc-100 max-md:pr-5 max-md:max-w-full focus:outline-none h-[42px]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="mt-5 text-sm font-medium leading-7 text-zinc-400 max-md:max-w-full">
                  Password
                </div>
                <div className="py-2" x-data="{ show: true }">
                  <div className="relative">
                    <input
                      type='password'
                      className="block items-start mt-2 ml-2 px-2 py-3 bg-black/0  rounded border-b border-solid border-b-zinc-100 text-zinc-100 max-md:pr-5 max-md:max-w-full focus:outline-none h-[42px]"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <Image
                          loading="lazy"
                          src={eye}
                          alt="eye"
                          className="w-5 aspect-square"
                        />
                    </div>
                  </div>
                </div>
                
                <button 
                  className="justify-center items-center px-10 py-3 mt-10 text-base font-medium leading-7 whitespace-nowrap rounded-md bg-zinc-400 text-zinc-900 max-md:px-5 max-md:max-w-full"
                  disabled={buttonDisable}
                  onClick={submitForm}
                  >
                  Login
                </button>
                
                <div className="mt-7 text-sm leading-7 text-zinc-950 max-md:max-w-full">
                  create an account?{" "}
                  <Link href="/signup" className="font-bold text-zinc-400">Signup</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
    </div>
  )
}

export default LoginPage;