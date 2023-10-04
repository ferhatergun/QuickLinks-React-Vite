import { doc , setDoc ,getDoc,updateDoc} from "firebase/firestore";
import { list } from "postcss";
import { db } from "~/firebase/firebase";


export const CreateDoc = async (username) => {
    const userDocRef = doc(db, 'users', username);
     // username isimli documenti yakalıyoruz
 
     setDoc(userDocRef, { // yakaladığımız referansın içini dolduruyoruz
       list:
       [
         {
           label: 'Başlık1',
           link:"https://www.google.com.tr/",
           visible:false
         },
         {
           label: 'Başlık2',
           link:"https://www.google.com.tr/",
           visible:false
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
  console.log("gelendata",data)
  try {
    await updateDoc(ref, data);
    console.log('Belge başarıyla güncellendi');
  } catch (error) {
    console.error('Hata:', error);
  }

}
export const docAdd = async (username,setData) => {
  const userDoc = await docGet(username)
  console.log(userDoc)
  try{
    const ref = doc(db, "users", username)
    await updateDoc(ref, {
      list: [...userDoc.list, {label:"Başlık",link:"https://www.google.com.tr/",visible:false}]
    });
    await setData((prev)=>({...prev, list: [...prev.list, { label: "Başlık", link: "https://www.google.com.tr/", visible: false }] }));
    console.log('Belge başarıyla güncellendi');
  }catch(error){
    console.error('Hata:', error);
  }

}


export const deleteLink = async (dataAll,setData,setCounter,index,username) => {
  if (dataAll.list.length === index-1) { // son elemanı siliyorsa
    const prevData = dataAll.list.slice(0, index)
    const newData = { ...dataAll, list: prevData }
    setData(newData)
    docUpdate(username,newData)
  } else if (index === 0) { // ilk elemanı siliyorsa
    const prevData = dataAll.list.slice(1)
    const newData = { ...dataAll, list: prevData }
    setData(newData)
    docUpdate(username,newData)
  } else { // arada bir elemanı siliyorsa
    const prevData = dataAll.list.slice(0, index).concat(dataAll.list.slice(index + 1)) 
    const newData = { ...dataAll, list: prevData }
    setData(newData)
    docUpdate(username,newData)
  }
  setCounter(prev=>prev+1)
  console.log("Link Silindi")
}