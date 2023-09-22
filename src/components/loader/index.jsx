import React from 'react'
import { HashLoader } from 'react-spinners';


export default function Loader() {
  return (
    <div className='flex items-center justify-center w-full h-[100vh]'>
      <HashLoader
      color="#BB274A"
      size={65}
      />
    </div>
  )
}
