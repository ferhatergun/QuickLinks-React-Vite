import React from 'react'
import { auth } from '~/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '~/components/loader'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminLayout() {
    const [admin,isLoading] = useAuthState(auth)
    if(isLoading){
        return <Loader />
    }
    if(admin){
      return <Outlet context={admin} />  
    }
    else{
        return <Navigate to="/" />
    }

}
