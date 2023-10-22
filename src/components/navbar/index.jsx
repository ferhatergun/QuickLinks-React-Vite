import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { userLogout } from '~/utils/userOperation';

export default function Navbar({ user }) {
  return (
    <div className='flex justify-between sm:px-10 px-3 py-5 items-center'>
      <div className="logo">
        <img src="logo.png" alt="logo" className='w-14' />
      </div>
      <div className="flex sm:gap-10 gap-3 items-center">
        {
          !user ?
            <>
              <Link to="/login" className="text-lg font-semibold">Login</Link>
              <Link to="/register" className="bg-color1 px-5 py-3 rounded-[20px] text-white">
                Register
              </Link>
            </> :
            <>
              <Link to="/admin" className="bg-color1 px-5 py-3 rounded-[20px] text-white">
                Admin Paneli
              </Link>
              <Tooltip title='Çıkış Yap' placement='bottom'>
                <div className=' drop-shadow-md shadow-md shadow-slate-300 rounded-md p-2 cursor-pointer'
                onClick={userLogout}>
                  <LogoutIcon/>
                </div>
              </Tooltip>
            </>
        }

      </div>
    </div>
  )
}
