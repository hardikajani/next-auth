'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div>
      <h1>Profile Page</h1>
      {userData.map((user) => (
        <div key={user._id}>
          <p>Id: {user._id}</p>
          <p>User Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfilePage;