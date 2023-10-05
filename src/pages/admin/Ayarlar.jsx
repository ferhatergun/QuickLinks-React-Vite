import React,{useEffect, useState} from 'react'
import Detail from '../[id]'
import { docGet, docUpdate } from '~/utils/docOparation';
import { useNavigate } from 'react-router-dom';
import { styles } from '~/styles';

export default function Ayarlar() {
    const [color, setColor] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const abc = { id: "fero1" }
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

  return (
    <div className='flex flex-col items-center  m-auto md:w-[70%] w-[90%]  pt-5'>
        <p className='mb-2'>Arkaplan Rengini Değiştir</p>
        <div className='flex gap-3 flex-wrap'>
            {
                styles.map((item,index)=>(
                    <div 
                    className={`w-28 h-8 bg-gray-200 rounded-md ${item} cursor-pointer`} 
                    onClick={()=>changeColor(index)} />
                ))
            }

        </div>
        <div className='w-full rounded-3xl overflow-hidden mt-5'>
            <Detail id={abc} bgcolor={color} />
        </div>
    </div>
  )
}