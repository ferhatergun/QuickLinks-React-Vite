import { doc, getDoc , setDoc} from 'firebase/firestore';
import { db } from '~/firebase/firebase';

export const userCheck = async (username) => {
    const usersRef = doc(db, 'users',username); // 'users' içinden username yi aldık varsa
    const querySnapshot = await getDoc(usersRef);
    if (querySnapshot.exists()) {
      console.log('Kullanıcı adı zaten kullanılıyor.');
    } else {
      console.log('Kullanıcı adı kullanılabilir.');
    }
}


export const userCreate = (username) => {
     const userDocRef = doc(db, 'users', username);
     // username isimli documenti yakalıyoruz
 
     setDoc(userDocRef, { // yakaladığımız referansın içini dolduruyoruz
       list:
       [
         {
           label: 'name',
           link:"https://www.google.com.tr/"
         },
         {
           label: 'surname',
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

export const getUser = async (username,navigate) => {
    const ref = doc(db, "users", username) // username isimli documenti aldık
    try {
        const user = await getDoc(ref); // kullanıcı verisini aldık
    
        if (user.exists()) { // kullanıcı verisi varsa geri gönderdik
            return user.data();
        } else {
            navigate('error');
            console.log('Belge bulunamadı.');
        }
    } catch (error) {
        console.error('Hata:', error);
    }
}
