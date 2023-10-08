import React, { useEffect ,useState} from 'react'
import { useParams ,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styles } from '~/styles';
import Loader from '~/components/loader';
import { docGet } from '~/utils/docOparation';
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '~/firebase/firebase';



export default function Detail({id,bgcolor}) {
    const params = id ? id : useParams()
    const [color, setColor] = useState("") 
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [data, setData] = useState({}) 
    const [photo, setPhoto] = useState('') 


    const getData = async () => {
      const data = await docGet(params.id,navigate)
      if(data){
          setColor(data.bgColor)
          setLoading(true)
          setData(data)
      }
    }
    const getPhotos = async () => {
      try{
        const imageRef = ref(storage, `profilPhotos/${params.id}`)
        const url = await getDownloadURL(imageRef)
        setPhoto(url)
      }catch(e){
        console.log("fotoğraf yüklerken hata oluştu",e)
      }
      

    }

    useEffect(()=>{
      getData()
      getPhotos()
    },[])


  if(loading)
    return (
    <div className={`min-h-[100vh] relative w-full pt-10 pb-5 flex flex-col 
    items-center ${styles[`${bgcolor !== undefined ? bgcolor : color}`]}`}>
      <div className='text-center gap-2 flex flex-col items-center'>
      <Avatar sx={{width:70,height:70}} src={photo}>
        <p className='text-[40px]'>{params.id.substring(0,1).toUpperCase()}</p>
      </Avatar>
      <p className='text-lg font-semibold'>@{params.id}</p>

      </div>
      <div className='max-w-[500px] w-[90%] mt-5 flex flex-col items-center gap-4 text-center'>
        {
          data.list.length > 0 ?
          data.list.map((item,index)=>(
              item.visible === true &&
              <motion.a  whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }} 
              href={item.link} target='_blank' key={index} className='w-full h-12 flex 
              items-center justify-center bg-gray-200  drop-shadow-xl rounded-lg '>
                {item.label}
              </motion.a>

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
