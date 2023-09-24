import React, { useEffect ,useState} from 'react'
import { auth } from '~/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useOutletContext ,useNavigate} from 'react-router-dom'
import { docGet } from '~/utils/docOparation'
import Loader from '~/components/loader'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import { Switch } from 'antd'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material'



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
      <div className='w-full h-full flex relative'>
        <div className='lg:w-[calc(100%-400px)] md:w-[calc(100%-350px)] w-full flex justify-center pt-5'>
          <div className='md:w-[80%] w-[90%] h-96  flex flex-col items-center'>
            <div className='max-w-[250px] w-[80%] flex justify-center items-center 
            gap-1 p-2 rounded-xl text-white bg-color1 mb-5'>
              <AddIcon/> Link Ekle
            </div>
            <div className='bg-gray-100 md:w-[500px] h-32 rounded-2xl mt-3 flex'>
              <div className='flex items-center'>
                <DragIndicatorIcon className='text-color1'/>
              </div>
              <div className='flex '>
                <div className='w-[80%]  p-5 relative'>
                  <input  className='w-full bg-transparent outline-none font-semibold' placeholder='Link Başlığı'/>
                  <input  className='w-full bg-transparent outline-none mt-1' placeholder='Link'/>
                  <Tooltip title='Linki Sil'>
                  <div className='absolute bottom-2 left-2 text-color1 rounded-lg p-1'>
                    <DeleteIcon/>
                  </div>
                  </Tooltip>
                </div>
                <div className='p-5 flex flex-col justify-around'>
                  <EditIcon className='text-color1'/>
                  <Switch
                    className='bg-color1 flex items-center'
                    checkedChildren={<VisibilityIcon  sx={{fontSize:20,mt:-0.5,pr:0.1}}/>}
                    unCheckedChildren={<VisibilityOffIcon sx={{fontSize:19,mt:-0.5}}/>} 
                    defaultChecked
                  /></div>
              </div>
            </div>
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