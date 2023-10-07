import React, { useEffect, useState } from 'react';
import { auth } from '~/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { docAdd, docGet ,docUpdate} from '~/utils/docOparation';
import Loader from '~/components/loader';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminEditLink from '~/components/adminEditLink';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return; // aynı yerine ise bişi yapmadı

    const items = Array.from(data.list); // listedeki aldık
    const [reorderedItem] = items.splice(result.source.index, 1); // sürüklenen itemi aldık
    items.splice(result.destination.index, 0, reorderedItem); // sürüklenen itemi yerine koyduk
    setData({ // verileri güncelledik
      ...data,
      list: items
    })
    setCounter(counter+1) // counterı arttırdık ki alttaki div tekrar render edilsin
  }
  
   useEffect(()=>{
    docUpdate("fero1",data)
  },[data])  

  return (
    <div className='w-full h-full flex relative'>
      <div className='w-full flex justify-center pt-5'>
        <div className='md:w-[80%] w-[90%] pb-20  flex flex-col items-center' key={counter}> 
        {/* key her değiştiğinde render edilir */}
          <div
            className='max-w-[300px] w-[80%] flex justify-center items-center 
            gap-1 p-2 rounded-xl text-white bg-color1 mb-5 cursor-pointer'
            onClick={() => addLink()}
          >
            <AddIcon /> Link Ekle
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="data">
              {
                (provided) =>(
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                        {loading &&
                      data?.list?.map((item, index) => (
                        <Draggable key={index} draggableId={index.toString()} index={index}>
                          {
                            (provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <AdminEditLink
                              key={index}
                              data={item}
                              dataAll={data}
                              index={index}
                              setData={setData}
                              setCounter={setCounter}
                            /></div>
                            )
                          }
                      </Draggable>
                    ))}
                      {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </DragDropContext>

        </div>
      </div>
    </div>
  );
}
