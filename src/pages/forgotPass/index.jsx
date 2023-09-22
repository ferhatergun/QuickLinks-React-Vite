import { TextField } from '@mui/material'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { passwordReset } from '~/utils/userOperation';


export default function ForgotPass() {

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
        <Link to="/"><img src="logo.png" alt="logo" className='w-14 mb-4' /></Link>
        <p className='text-lg font-semibold'>Şifremi Unuttum</p>
          <Formik
            initialValues={{
              Email: "",
            }}
            validationSchema={
              yup.object({
                Email: yup.string().email("Doğru Bir Mail Giriniz ( @ )").required("Email zorunludur"),
              })
            }
            onSubmit={(values,{setErrors}) => {
              console.log(values)
              passwordReset(values,setErrors)
            }}
          >
            {({ values, errors, handleChange, handleBlur, touched ,handleSubmit}) => (

              <form className='flex flex-col items-center lg:w-[60%] sm:w-[70%] w-[90%]' onSubmit={handleSubmit}>
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
              {
               (Object.keys(errors).length > 0 || !Object.keys(touched).length) ?
              <input type="submit" value="Şifremi Sıfırla" disabled className='bg-color1 opacity-30 w-[70%] text-white rounded-[10px] mt-8 p-2 cursor-not-allowed '/>:
              <input type="submit" value="Şifremi Sıfırla" className='bg-color1 w-[70%] text-white rounded-[10px] mt-8 p-2 cursor-pointer'/>
              }
              <p className='text-black mt-4'>Şifreni Hatırladın Mı ? 
                <Link to='/login' className='text-color1'> Tıkla Giriş Yap </Link> 
              </p>
              </form>
            )}
          </Formik>
    </div>
    </div>
  )
}
