import { doc ,getDoc} from 'firebase/firestore';
import React from 'react'
import { userCheck, userCreate } from '~/utils/userOperation';
import { db  } from '~/firebase/firebase';
import { styles } from '~/styles';
import Navbar from '~/components/navbar';
import HomeContent from '~/components/homeContent';



export default function Home() {
  const [color, setColor] = React.useState('white');

  const getUser = async () => {
    const ref = doc(db, "users", "deneme-1")
    try {
      const user = await getDoc(ref);
  
      if (user.exists()) {
        const documentData = user.data();
        console.log('Belge Verisi:', documentData);
        setColor(documentData.bgColor)
      } else {
        console.log('Belge bulunamadı.');
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  }
  
  return (
    <div style={{backgroundColor:color}} className='lg:w-[80vw] m-auto'>
      <Navbar />
      <HomeContent />
      <div className='text-[50px]' onClick={()=>userCreate("deneme-1")} >kullanıcı oluştur</div>
      <div className='text-[50px]' onClick={()=>userCheck("fero")} >kullanıcı kontrol et</div>
      <div onClick={getUser}>Kullanıcıyı getir</div>
      <div className={`${styles.background_2} w-full h-32`}></div>



    </div>
  )
}