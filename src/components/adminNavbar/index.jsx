import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tooltip } from '@mui/material'
import { userLogout } from '~/utils/userOperation';
import { Dropdown } from 'antd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { WhatsappShareButton } from 'react-share';
import { QRCode } from 'antd';





export default function AdminNavbar({admin}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [qrUrl,setQrUlr]=useState("www.google.com")
    const items =[
        {
            key: '1',
            label: (
              <Link to="/admin" className='flex gap-2 items-center p-2'>
                <VisibilityIcon fontSize='small' />
                <p className='text-md'>Görünüm</p>
              </Link>
            ),
          },
          {
            key: '2',
            label: (
              <Link to="ayarlar" className='flex gap-2 items-center p-2'>
                <SettingsIcon fontSize='small' />
                <p className='text-md'>Ayarlar</p>
              </Link>
            ),
          },
          {
            key: '3',
            label: (
              <div className='flex gap-2 items-center p-2' onClick={userLogout}>
                <LogoutIcon fontSize='small' />
                <p className='text-md'>Çıkış Yap</p>
              </div>
            ),
          },
    ]

    const copyUrl=()=>{
      navigator.clipboard.writeText(`${window.location.origin}/page/${admin.displayName}`)
      toast.success("URL Kopyalandı")

    }
  return (
    <div className='flex justify-between sm:px-10 mx-4 px-10 py-2 mt-2 items-center bg-slate-100 drop-shadow-sm shadow-sm rounded-2xl   '>
    <div className='flex md:gap-14 '>
    <Link className="logo">
      <img src="/logo.png" alt="logo" className='w-14' />
    </Link>
      <Link to="/admin" className='gap-2 items-center p-2  hover:text-color1 sm:flex hidden'>
        <VisibilityIcon fontSize='medium' />
        <p className='text-base'>Linklerim</p>
      </Link>
      <Link to="ayarlar" className='gap-2 items-center p-2  hover:text-color1 sm:flex hidden'>
        <SettingsIcon fontSize='medium' />
        <p className='text-base'>Ayarlar</p>
      </Link>
      <div className='gap-2 items-center p-2  hover:text-color1 sm:flex hidden cursor-pointer' onClick={handleOpen}>
        <ShareIcon fontSize='medium' />
        <p className='text-base'>Paylaş</p>
      </div>
      </div>
      <div className='gap-2 items-center p-2 cursor-pointer hover:text-color1 sm:flex hidden' onClick={userLogout}>
        <LogoutIcon fontSize='medium' />
        <p className='text-base'>Çıkış Yap</p>
      </div>
      <div className="flex gap-5 items-center sm:hidden">
        <div className='gap-2 items-center p-2  hover:text-color1 flex cursor-pointer' onClick={handleOpen}>
          <ShareIcon fontSize='medium' />
          <p className='text-base'>Paylaş</p>
        </div>
        <Dropdown menu={{items}} placement='bottom' className='cursor-pointer' overlayClassName='pt-2'>
            <Avatar sx={{width: 40, height: 40}}>A</Avatar>
        </Dropdown>
    </div>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div className='flex flex-col gap-3'>
    <div className='flex justify-center gap-3'>
      <p>URL Kopyala</p>
      <ContentCopyIcon className='cursor-pointer' 
      onClick={()=>copyUrl()} />
    </div>
    <div id="myqrcode">
      <QRCode
      className='m-auto'
      errorLevel="H"
      value={`${window.location.origin}/page/${admin.displayName}`}
      icon="/logo.png"
      />
    </div>
    <WhatsappShareButton url={`${window.location.origin}/page/${admin.displayName}`}>Paylaş</WhatsappShareButton>
    </div>
  </Box>
</Modal>
  </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  dispay: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: '1rem',
};