import React,{useState} from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Content() {
    const [name, setName] = useState('')
  return (
    <div className='min-h-[50vh] bg-gray-100 mt-20 rounded-[20px] flex flex-wrap-reverse justify-center overflow-hidden'>
        <div className="md:w-[50%] w-full md:p-10 p-5">
            <TypeAnimation
            sequence={[
                'Tek Link Sonsuz Bağlantı',
                3000, // Waits 1s
                'Tek Link Sonsuz İletişim',
                3000, // Waits 2s
                'Tek Link Sonsuz Paylaşım',
                3000,
            ]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className='lg:text-3xl text-2xl text-[#bb274a]'
            />
            <p className='lg:text-lg  text-base mt-[3vh]'>
            Kolayca Keşfedilir Olun Bağlantılarınızın karmaşasından kurtulun 
            ve sizi tanımayanlar için erişilebilir hale gelin. 
            Potansiyel takipçilerinizi ve müşterilerinizi kendinize çekin
            </p>
            <div className='bg-gray-100 lg:w-[350px] md:w-[320px] sm:w-[350px] w-[100%] pl-2
            h-14 rounded-2xl mt-[3vh] shadow-gray-300 shadow-sm drop-shadow-xl flex items-center'>
                <div className='text-gray-400'>quicklinks/</div>
                <input type="text" 
                placeholder='username' 
                className='pl-[1px] outline-none rounded-2xl bg-gray-100 w-full text-gray-500' 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <Link className='h-[70%] w-40 mr-2 bg-[#bb274a] rounded-2xl 
                flex justify-center items-center text-white shadow-gray-300 shadow-sm drop-shadow-xl'
                to="/register" state={{username:name}}>
                Lets Start</Link>
            </div>
        </div>
        <div className="md:w-[50%] max-h-[50vh]">
            <motion.img
            src="/fotos-1.png"
            alt=""
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration:0.5,ease:'easeIn',delay:0.3}}
            className='h-full m-auto '
            />
        </div>
    </div>
  )
}
