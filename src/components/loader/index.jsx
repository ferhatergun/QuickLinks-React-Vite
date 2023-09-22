import React from 'react'
import { HashLoader } from 'react-spinners';


export default function Loader() {
  return (
    <HashLoader
    color="#BB274A"
    cssOverride={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100%'}}
    size={65}
  />
  )
}
