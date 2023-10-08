import { doc ,getDoc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { userCheck, userCreate } from '~/utils/userOperation';
import { db  } from '~/firebase/firebase';
import { styles } from '~/styles';
import Navbar from '~/components/navbar';
import HomeContent from '~/components/homeContent';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '~/firebase/firebase';
import Loader from '~/components/loader';


export default function Home() {
  const [color, setColor] = React.useState('white');

  const getUser = async () => {
    const ref = doc(db, "users", "deneme-1")
    try {
      const user = await getDoc(ref);
  
      if (user.exists()) {
        const documentData = user.data();
        setColor(documentData.bgColor)
      } else {
        console.log('Belge bulunamadı.');
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  }

  const [user,isLoading] =useAuthState(auth)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
  },[])

  return (
    <div style={{backgroundColor:color}} className='lg:w-[80vw] m-auto'>
      { (!isLoading && loading) ?
      <>
        <Navbar user={user} />
        <HomeContent />
        <HomeContent />
        </>:
        <Loader />
      }

    </div>
  )
} 


