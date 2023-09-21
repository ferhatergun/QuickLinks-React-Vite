import { doc , setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";


export const CreateDoc = async (username) => {
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