import { doc, getDoc , setDoc ,updateDoc} from 'firebase/firestore';
import { db ,auth} from '~/firebase/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { CreateDoc } from './docOparation';
import { toast } from 'react-toastify';

export const userCheck = async (username) => {
    const usersRef = doc(db, 'users',username); // 'users' içinden username yi aldık varsa
    const querySnapshot = await getDoc(usersRef);
    if (querySnapshot.exists()) {
      return false
    } else {
      return true
    }
}


export const userCreate = async (values,setErrors) => {
  try{
  const check = await userCheck(values.UserName)
  if(check){
    const user = await createUserWithEmailAndPassword(auth,values.Email,values.Password)
    if(user){
      updateProfile(user.user,{displayName:values.UserName})
      .then(()=>CreateDoc(values.UserName))
      .catch((e)=>console.log("kullanıcı adı güncellenirken hata oluştu",e))
      .finally(()=>toast.success("Kayıt Başarılı"))
    }
    else{
      console.log("kullanıcı oluşturulurken hata oluştu")
    }     
  }
  else{
    setErrors({ UserName: 'Bu Kullanıcı Adı Kullanılıyor' })
  }
  }
  catch(e){
    console.log("kayıt olurken hata oluştu",e)
  }
}

export const userLogin = async (values) => {
  try{
    const user = await signInWithEmailAndPassword(auth,values.Email,values.Password)
    if(user){
      toast.success("Giriş Başarılı")
    }
  }
  catch(e){
    toast.error("Giriş Başarısız")
    console.log("giriş yaparken hata oluştu",e)
  }
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
