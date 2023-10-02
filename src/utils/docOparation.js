import { doc , setDoc ,getDoc,updateDoc} from "firebase/firestore";
import { db } from "~/firebase/firebase";


export const CreateDoc = async (username) => {
    const userDocRef = doc(db, 'users', username);
     // username isimli documenti yakalıyoruz
 
     setDoc(userDocRef, { // yakaladığımız referansın içini dolduruyoruz
       list:
       [
         {
           label: 'Başlık1',
           link:"https://www.google.com.tr/"
         },
         {
           label: 'Başlık2',
           link:"https://www.google.com.tr/"
         }
       ]}
     )
       .then(() => {
         console.log('başarıyla oluşturuldu: ');
       })
       .catch((error) => {
         console.error('hata oluştu');
       });
}

export const docGet = async (username,navigate) => {
  const ref = doc(db, "users", username) // username isimli documenti aldık
  try {
      const user = await getDoc(ref) // kullanıcı verisini aldık
  
      if (user.exists()) { // kullanıcı verisi varsa geri gönderdik
          return user.data()
      } else {
          navigate('error')
          console.log('Belge bulunamadı.')
      }
  } catch (error) {
      console.error('Hata:', error)
  }
}
export const docUpdate = async (username,data) => {
  const ref = doc(db, "users", username) // username isimli documenti aldık
  try {
    await updateDoc(ref, data);
    console.log('Belge başarıyla güncellendi');
  } catch (error) {
    console.error('Hata:', error);
  }

}