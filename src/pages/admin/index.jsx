import React, { useEffect ,useState} from 'react'
import { auth } from '~/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useOutletContext ,useNavigate} from 'react-router-dom'
import { docGet } from '~/utils/docOparation'
import Loader from '~/components/loader'


export default function Admin() {
    const admin = useOutletContext()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    console.log(admin)

    const getData = async () => {
        const data = await docGet(admin.displayName,navigate)
        setData(data)
    }

    useEffect(()=>{
        getData()
        setLoading(true)
    },[])
    


  return (
    <div>
        {
            loading &&
            data?.list?.map((item,index)=>(
                <p>{item.label}</p>
            )) 
        }
    </div>
  )
}
