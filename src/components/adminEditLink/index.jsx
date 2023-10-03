import React, { useEffect, useState } from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import { Switch } from 'antd'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material'
import '~/styles/globals.css'
import { RiSendPlaneFill } from "react-icons/ri";
import { docUpdate } from '~/utils/docOparation';

export default function AdminEditLink({data,dataAll,index,setData,setCounter}) {
  const [edit,setEdit]=useState(false)
  const handleEdit = () =>{
    setEdit(!edit)
  }
  const handleActive = (e) => {
    data.visible=e
    update(dataAll)
  }
  const deleteLink = async () => {
    if (dataAll.list.length === index-1) { // son elemanı siliyorsa
      const prevData = dataAll.list.slice(0, index)
      const newData = { ...dataAll, list: prevData }
      setData(newData)
      update(newData)
    } else if (index === 0) { // ilk elemanı siliyorsa
      const prevData = dataAll.list.slice(1)
      const newData = { ...dataAll, list: prevData }
      setData(newData)
      update(newData)
    } else { // arada bir elemanı siliyorsa
      const prevData = dataAll.list.slice(0, index).concat(dataAll.list.slice(index + 1)) 
      const newData = { ...dataAll, list: prevData }
      setData(newData)
      update(newData)
    }
    setCounter(prev=>prev+1)
    console.log("Link Silindi")
  }
  
  const update = (updateData) => {
    docUpdate("fero1",updateData)
  }
  return (
    <div>
      <div className='bg-gray-100 md:w-[500px] h-32 rounded-2xl mt-3 flex'>
        <div className='flex items-center'>
            <DragIndicatorIcon className='text-color1'/>
        </div>
      <div className='flex'>
        <div className='w-[80%]  p-5 relative'>
          <input 
          className={`w-full outline-none font-semibold rounded-xl px-1 ${edit ? 'bg-gray-200' : 'bg-transparent'}`} 
          placeholder='Link Başlığı'
          disabled={edit ? false : true}
          defaultValue={data?.label}
          onChange={(e)=>data.label=e.target.value}
          />
          <input 
          className={`w-full outline-none mt-1 rounded-xl px-1 ${edit ? 'bg-gray-200' : 'bg-transparent'}`} 
          placeholder='Link'
          disabled={edit ? false : true}
          defaultValue={data?.link}
          onChange={(e)=>data.link=e.target.value}
          />
          <Tooltip title='Linki Sil'>
            <div className='absolute bottom-2 left-2 text-color1 rounded-lg p-1 cursor-pointer hover:bg-gray-200'
            onClick={()=>deleteLink()}>
              <DeleteIcon/>
            </div>
          </Tooltip>
        </div>
        <div className='p-5 flex flex-col justify-around'>
            <div className='text-color1 rounded-lg p-1 cursor-pointer flex justify-center' onClick={handleEdit}>
              {
                edit ?
                <RiSendPlaneFill fontSize={24} onClick={()=>update(dataAll)}/> :
                <EditIcon />
              }
            </div>                
            <Switch
            className='switch bg-color1 flex items-center'
            checkedChildren={<VisibilityIcon  sx={{fontSize:20,mt:-0.5,pr:0.1}}/>}
            unCheckedChildren={<VisibilityOffIcon sx={{fontSize:19,mt:-0.5}}/>} 
            onChange={(e)=>handleActive(e)}
            defaultChecked={data?.visible}
            />
        </div>
      </div>
    </div>
    </div>
  )
}
