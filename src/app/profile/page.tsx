'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';

interface UserData {
  _id: string;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  
  useEffect(() => {
    ;(
      async () => {
        try {
          const response = await axios.post('/api/users/profile')
          const userDataArray = response.data.data;
          console.log(userDataArray)
        if (Array.isArray(userDataArray)) {
          setUserData(userDataArray)
        } else {
          setUserData([userDataArray])
        }
        } catch (error:any) {
          console.log(error.message)
        }
      }
    )()
  }, [])
  return (
    <div className='flex flex-col mt-20 items-center justify-center py-5'>
      <h1 className='text-3xl font-bold text-center'>Profile Page</h1>
      {userData.map((user) => (
        <div key={user._id} className='mt-10 text-zinc-100 items-center justify-center'>
          <Link 
            href={`/profile/${user._id}`}
            className='text-center text-zinc-400 mt-5'
          >
            Id: {user._id}
          </Link>
          <p className='text-center text-zinc-400 mt-5'>User Name: {user.username}</p>
          <p className='text-center text-zinc-400 mt-5'>Email: {user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfilePage;