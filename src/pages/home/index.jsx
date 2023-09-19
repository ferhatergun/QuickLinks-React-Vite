import React from 'react'
import { userCheck, userCreate } from '~/utils/userOperation';


export default function Home() {
  
  return (
    <>
      <div className='text-[50px]' onClick={()=>userCreate("deneme-1")} >kullanıcı oluştur</div>
      <div className='text-[50px]' onClick={()=>userCheck("fero")} >kullanıcı kontrol et</div>
    </>
  )
}