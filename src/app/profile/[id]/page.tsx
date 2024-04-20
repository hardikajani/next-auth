'use client'
import React from 'react'

const page = ({params}:any) => {
  return (
    <div className='flex flex-col mt-20 items-center justify-center py-5'>
        <h1 className='text-3xl font-bold text-center'>dynamic routing value from params</h1>
        <h2 className='text-center text-zinc-400 bg-black/80 px-5 py-2 mt-5'>User's Id: {params.id}</h2>
    </div>
  )
}

export default page;