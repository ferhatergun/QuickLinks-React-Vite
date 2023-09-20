import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-between sm:px-10 px-3 py-5 items-center'>
        <div className="logo">LOGO</div>
        <div className="flex sm:gap-10 gap-3 items-center">
            <div className="text-lg font-semibold">Login</div>
            <div className="bg-color1 px-5 py-3 rounded-[20px] text-white">
                Register
            </div>
        </div>
    </div>
  )
}
