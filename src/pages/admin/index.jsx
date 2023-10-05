import React, { useEffect, useState } from 'react';
import { auth } from '~/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { docAdd, docGet } from '~/utils/docOparation';
import Loader from '~/components/loader';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminEditLink from '~/components/adminEditLink';
import Detail from '../[id]';

export default function Admin() {
  const admin = useOutletContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const getData = async () => {
    const data = await docGet(admin.displayName, navigate);
    setData(data);
  };

  useEffect(() => {
    getData();
    setLoading(true);
  }, []);

  const addLink = () => {
    docAdd("fero1", setData);
  };

  const abc = { id: "fero1" };

  return (
    <div className='w-full h-full flex relative'>
      <div className='w-full flex justify-center pt-5'>
        <div className='md:w-[80%] w-[90%] pb-20  flex flex-col items-center' key={counter}>
          <div
            className='max-w-[300px] w-[80%] flex justify-center items-center 
            gap-1 p-2 rounded-xl text-white bg-color1 mb-5 cursor-pointer'
            onClick={() => addLink()}
          >
            <AddIcon /> Link Ekle
          </div>
          {loading &&
            data?.list?.map((item, index) => (
              <AdminEditLink
                key={index}
                data={item}
                dataAll={data}
                index={index}
                setData={setData}
                setCounter={setCounter}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
