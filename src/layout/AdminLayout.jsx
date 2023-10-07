import React from 'react'
import { auth } from '~/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '~/components/loader'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNavbar from '~/components/adminNavbar'

export default function AdminLayout() {
    const [admin,isLoading] = useAuthState(auth)
    if(isLoading){
        return <Loader />
    }
    if(admin){
      return(
        <div>
            <AdminNavbar admin={admin} />
            <Outlet context={admin} />
        </div>

      )   
    }
    else{
        return <Navigate to="/" />
    }

}
