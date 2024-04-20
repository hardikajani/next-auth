'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LogoutPage = () => {
    const router = useRouter()
    useEffect(() => {
        ;(
          async () => {
            try {
              const response = await axios.post('/api/users/logout')
              localStorage.removeItem('isAuthor')
              router.push('/login')

                
            } catch (error:any) {
              console.log(error.message)
            }
          }
        )()
      }, [])
  return (
    <div>

    </div>
  )
}

export default LogoutPage;