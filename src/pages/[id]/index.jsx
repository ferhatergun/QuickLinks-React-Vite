import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import { doc ,getDoc} from 'firebase/firestore';
import { db  } from '~/firebase/firebase';
import { getUser } from '~/utils/userOperation';
import { useNavigate } from 'react-router-dom';


export default function Detail() {
    const params = useParams()
    const [color, setColor] = useState('white') // color # ile tutulsun
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();



    useEffect(()=>{
        const getData = async () => {
            const data = await getUser(params.id,navigate)
            if(data){
               setColor(data.bgColor)
               setLoading(true)
            }
            
        }
        getData()
    },[])
    if(loading)
  return (
    <div className={`h-[100vh] bg-${color}-100`}>index</div>
  )
}
