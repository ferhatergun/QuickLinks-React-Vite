import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "~/firebase/firebase"

export default function LoginLayout() {
    const [user,isLoading] = useAuthState(auth)

    if(isLoading){
        return <div>Loading...</div>
    }
     if(user)
    return (
    <Navigate to="/" />
  )
  else if(!user){
    return <Outlet />
  } 
}
