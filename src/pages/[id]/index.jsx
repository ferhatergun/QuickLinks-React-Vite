import React, { useEffect ,useState} from 'react'
import { useParams ,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styles } from '~/styles';
import Loader from '~/components/loader';
import { docGet } from '~/utils/docOparation';
import { Avatar } from '@mui/material';


export default function Detail({id,bgcolor}) {
    const params = id ? id : useParams()
    const [color, setColor] = useState("") // color # ile tutulsun
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [data, setData] = useState({}) //



    useEffect(()=>{
      const getData = async () => {
        const data = await docGet(params.id,navigate)
        if(data){
            setColor(data.bgColor)
            console.log(color)
            setLoading(true)
            setData(data)
        }
      }
      getData()
    },[])
    
  if(loading)
    return (
    <div className={`min-h-[100vh] relative w-full pt-10 pb-5 flex flex-col 
    items-center ${styles[`${bgcolor ? bgcolor : color}`]}`}>
      <div className='text-center gap-2 flex flex-col'>
      <Avatar sx={{width:70,height:70}}>
        <p className='text-[40px]'>{params.id.substring(0,1).toUpperCase()}</p>
      </Avatar>
      <p className='text-lg font-semibold'>@{params.id}</p>

      </div>
      <div className='max-w-[500px] w-[90%] mt-5 flex flex-col items-center gap-4 text-center'>
        {
          data.list.length > 0 ?
          data.list.map((item,index)=>(
              item.visible === true &&
              <Link to={item.link} target='_blank' key={index} className='w-full h-12 flex 
              items-center justify-center bg-gray-200  drop-shadow-xl rounded-lg hover:scale-[103%] duration-200 ease-in'>
                {item.label}
              </Link>

          )) :
          <p className='text-lg'>Link Bulunamadı</p>
        }
      </div>
      <div className='mt-5 flex flex-col items-center'>
        <img src='/logo.png' alt='logo'  className='w-10 h-10'/>
        <p className='text-sm font-sans '>QuickLinks</p>
      </div>
    </div>
    )
  else if(!loading){
    return(<Loader />)
  }
}
