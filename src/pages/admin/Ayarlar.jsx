import React,{useEffect, useState} from 'react'
import Detail from '../[id]'
import { docGet, docUpdate } from '~/utils/docOparation';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { styles } from '~/styles';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/firebase/firebase';
import { toast } from 'react-toastify';

export default function Ayarlar() {
    const [color, setColor] = useState(undefined);
    const [data, setData] = useState([]);
    const admin = useOutletContext()
    const navigate = useNavigate();
    const abc = { id: admin.displayName }
    useEffect(()=>{
        const getData = async () => {
            const data = await docGet(abc.id,navigate)
            setData(data)
        }
        getData()
    },[])

    const changeColor = (color) => { // rengi değiştirip databasede güncelle 
        data.bgColor=color
        setColor(color)
        docUpdate(abc.id,data)
    }

    const uploadImage = (e) => {
        const file=e.target.files[0]
        const imageRef = ref(storage, `profilPhotos/${abc.id}`)
        uploadBytes(imageRef,file)
        toast.success("Fotoğraf başarıyla yüklendi")
    }

  return (
    <div className='flex flex-col items-center  m-auto md:w-[70%] w-[90%]  pt-5'>
        <p className='mb-2'>Profil Resmi Yükle</p>
        <input type='file' className='mb-5 ' accept='image/*' onChange={(e)=>uploadImage(e)} />
        <p className='mb-2'>Arkaplan Rengini Değiştir</p>
        <div className='flex gap-3 flex-wrap  justify-center'>
            {
                styles.map((item,index)=>(
                    <div 
                    className={`w-28 h-10 bg-gray-200  rounded-md ${item} cursor-pointer`} 
                    onClick={()=>changeColor(index)}
                    key={index} />
                ))
            }

        </div>
        <div className='w-full rounded-3xl overflow-hidden mt-5'>
            <Detail id={abc} bgcolor={color} />
        </div>
    </div>
  )
}
