import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styles } from '~/styles';
import Loader from '~/components/loader';
import { docGet } from '~/utils/docOparation';


export default function Detail() {
    const params = useParams()
    const [color, setColor] = useState("pink") // color # ile tutulsun
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();



    useEffect(()=>{
      const getData = async () => {
        const data = await docGet(params.id,navigate)
        if(data){
            setColor(data.bgColor)
            console.log(color)
            setLoading(true)
        }
      }
      getData()
    },[])
    
  if(loading)
    return (
    <div className={`h-[100vh] w-full ${styles[`background_${color}`]}`}>
      <p>hello</p>
    </div>
    )
  else if(!loading){
    return(<Loader />)
  }
}
