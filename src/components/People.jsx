
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';

import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import axios from '../utils/axios';


function People() {

    
    document.title = "AM | People" ;


    const navigate = useNavigate()
    const [category, setcategory] = useState("popular");
    const [people, setpeople] = useState([])
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetPeople = async() => {
        try{
          const { data } = await axios.get(`/person/${category}?page=${page}  `);

          console.log(data);
  
          if(data.results.length > 0){
            setpeople((prevState) => [...prevState, ...data.results]);
            setpage(page + 1)
          }
          else {
            sethasMore(false)
          }
          //settrending(data.results);
          
        }catch (error) {
          console.log("Error: ",error)
        }
      };
  
      const refershHandler = () => {
        if(people.length === 0 ){
          GetPeople()
        }else {
           setpage(1);
           setpeople([]);
           GetPeople();
        }
      }
  
  
      console.log(People)
  
      useEffect(() => {
        refershHandler();
  
      },[category])

  return (
    people.length > 0 ? (
    
        <div className=' w-screen h-screen '>
            <div className='px-[5%] w-full   items-center flex justify-between  '>
                <h1 className='text-2xl  text-zinc-400 font-semibold '>
                   <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD]"></i>{" "}
                  People
                </h1>
                <div className='flex items-center w-[80%] '>
                  <Topnav />
                  <div className='w-[2%]'></div>
                  
                </div>
                
            </div>
            <InfiniteScroll dataLength={people.length} next={GetPeople} hasMore={hasMore} loader={<h1>loading.......</h1>}>
               <Cards data={people} title="people"/>
            </InfiniteScroll>
           
    
        </div>
        ): (
            <Loading/>
        )
  )
}

export default People