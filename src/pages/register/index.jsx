import React from 'react'
import { TextField } from '@mui/material'
import { Formik } from 'formik';
import * as yup from 'yup';
import img from '~/assets/logo.png'
import { Link } from 'react-router-dom';
import { userCreate } from '~/utils/userOperation';


export default function Register() {

   const inputstyles = {
        "& .MuiInputLabel-root.Mui-focused ": {
          // placeholders yukarı gidinceki rengi
          color: "black",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black !important", // inputa basınca kenarlık
            borderWidth: "2px",
        },
        "& .MuiOutlinedInput-root ": {
          borderRadius: "10px !important",
        },
        width: "100%",
        marginTop: "20px",
      };
      const erorStyles={
        "& .MuiFormHelperText-root.Mui-error":{
          position:'absolute',
          marginTop:'55px',
          marginLeft:1,
        }
    }
  return (
    <div className='flex justify-center items-center h-[100vh] pb-10 '>
    <div className='bg-gray-100 max-w-[600px] md:w-[60%] sm:w-[70%] w-full m-auto
    sm:px-10 py-5 flex flex-col items-center rounded-[20px] shadow-sm drop-shadow-lg'>
        <img src={img} alt="logo" className='w-14 mb-4' />
          <Formik
            initialValues={{
              UserName: "",
              Email: "",
              Password: "",
            }}
            validationSchema={
              yup.object({
                UserName: yup.string().required("Kullanıcı adı zorunludur"),
                Email: yup.string().email("Doğru Bir Mail Giriniz ( @ )").required("Email zorunludur"),
                Password: yup.string().min(7,"Şifre min 7 Karakterli olmalıdır").required("Şifre zorunludur"),
              })
            }
            onSubmit={(values,{setErrors}) => {
              // console.log(values)
              userCreate(values,setErrors)
            }}
          >
            {({ values, errors, handleChange, handleBlur, touched ,handleSubmit}) => (
              <form className='flex flex-col items-center lg:w-[60%] sm:w-[70%] w-[90%]' onSubmit={handleSubmit}>
              <TextField 
              label="Kullanıcı Adı"
              id="UserName"
              onChange={handleChange}
              value={values.UserName}
              onBlur={handleBlur}
              error={errors.UserName && touched.UserName}
              helperText={errors.UserName && touched.UserName ? errors.UserName:null}
              sx={{...inputstyles, ...erorStyles}}
              />

              <TextField 
              label="Email"
              id="Email"
              onChange={handleChange}
              value={values.Email}
              onBlur={handleBlur}
              error={errors.Email && touched.Email}
              helperText={errors.Email && touched.Email ? errors.Email:null}
              sx={{...inputstyles, ...erorStyles}}
              />

              <TextField 
              label="Şifre"
              id="Password"
              onChange={handleChange}
              value={values.Password}
              onBlur={handleBlur}
              error={errors.Password && touched.Password}
              helperText={errors.Password && touched.Password ? errors.Password:null}
              sx={{...inputstyles, ...erorStyles}}
              />
              {
               (Object.keys(errors).length > 0 || !Object.keys(touched).length) ?
              <input type="submit" value="Kayıt Ol" disabled className='bg-color1 opacity-30 w-[70%] text-white rounded-[10px] mt-8 p-2 cursor-not-allowed '/>:
              <input type="submit" value="Kayıt Ol" className='bg-color1 w-[70%] text-white rounded-[10px] mt-8 p-2 cursor-pointer'/>
              }
              <p className='text-black mt-4'>Zaten Hesabın Var Mı ? 
                <Link to='/login' className='text-color1'> Tıkla Giriş Yap </Link> 
              </p>
              </form>
            )}
          </Formik>
    </div>
  </div>
  )
}
