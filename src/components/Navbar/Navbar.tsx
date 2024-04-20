'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    const isAuthorValue = localStorage?.getItem('isAuthor');
  if (isAuthorValue!== null) {
    setIsAuthor(isAuthorValue === 'true');
  }
  else{
    setIsAuthor(false)
  }
  },[isAuthor])
  return (
    <nav className="flex items-center space-x-8 justify-between p-5 shadow-md">
      <Link href="/" className="text-2xl font-bold text-gray-200">
        @ DAY~AI
      </Link>      
      <div className="flex space-x-4">
      <Link href="/profile" className="text-gray-200 hover:text-gray-300">
            Profile
          </Link>
          <Link href="/contact" className="text-gray-200 hover:text-gray-300">
            Contact
          </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthor ? (
          <>
               <Link href="/logout" className="px-4 py-2 text-black/85 bg-gray-200 rounded hover:bg-gray-300">
                Logout
            </Link>       
          </>
        ) : 
          (
            <>           

            <Link href="/signup" className="px-4 py-2 text-black/85 bg-gray-200 rounded hover:bg-gray-300">
              Sign Up
            </Link>
            <Link href="/login" className="px-4 py-2 text-black/85 bg-gray-200 rounded hover:bg-gray-300">
              Login
            </Link>
              
            </>
          )
        }
        
        
      </div>
    </nav>
  );
};

export default Navbar;