import React, { useEffect ,useState} from 'react'
import { auth } from '~/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useOutletContext ,useNavigate} from 'react-router-dom'
import { docAdd, docGet } from '~/utils/docOparation'
import Loader from '~/components/loader'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AdminEditLink from '~/components/adminEditLink'



export default function Admin() {
    const admin = useOutletContext()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [counter,setCounter] = useState(0)

    const getData = async () => {
        const data = await docGet(admin.displayName,navigate)
        setData(data)
    }

    useEffect(()=>{
        getData()
        setLoading(true)
    },[])

    const addLink = () => {
      docAdd("fero1",setData)
    }
    

    return (
      <div className='w-full h-full flex relative'>
        <div className='lg:w-[calc(100%-400px)] md:w-[calc(100%-350px)] w-full flex justify-center pt-5'>
          <div className='md:w-[80%] w-[90%] h-96  flex flex-col items-center' key={counter}>
            <div className='max-w-[250px] w-[80%] flex justify-center items-center 
            gap-1 p-2 rounded-xl text-white bg-color1 mb-5'
            onClick={()=> addLink()}>
              <AddIcon/> Link Ekle
            </div>
            {
              loading && 
              data?.list?.map((item,index)=>(
                <AdminEditLink 
                key={index} 
                data={item} 
                dataAll={data} 
                index={index} 
                setData={setData} 
                setCounter={setCounter}/>
              ))
            }
          </div>
      </div>


      <div className='relative md:block hidden'>
        <div className='fixed flex justify-center lg:w-[400px] w-[350px]'>
          <div className='w-[90%] h-[70vh] border-red-300 border-2 rounded-2xl flex flex-col items-center pt-[3vh]'>
            <Avatar sx={{width:50,height:50,fontSize:23}}>M</Avatar>
            <p className='text-xl font-semibold mt-2'>@TestUser</p>
          </div>
        </div>
      </div>
      </div>
    );
    
}

// xl:w-[calc(100%-500px)] lg:w-[calc(100%-450px)] md:w-[calc(100%-400px)] w-full h-[5000px] bg-gray-100
// xl:w-[500px] lg:w-[450px] md:w-[400px] fixed right-0 md:block bg-gray-500 p-5 h-full  hidden overflow-hidden 
{/*           <div className='z-99 fixed flex justify-center items-center '>
            <iframe
              src='https://quick-links-react-vite.vercel.app/'
              className='lg:w-[300px] w-[350px] h-[75vh]  rounded-[40px]'
            ></iframe>
          </div> */}

          {/*             <img
              src='phone.jpg'
              alt='Telefon Görüntüsü'
              className='lg:w-[400px] w-[350px] h-[80vh] object-contain'
            /> */}