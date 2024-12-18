import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'

import InfiniteScroll from 'react-infinite-scroll-component'


import axios from "../utils/axios"
import Loading from './Loading'



function Trending() {
    const navigate = useNavigate()
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([])
    const[page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = "AM | Trending" ;

    const GetTrending = async() => {
      try{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${category}/${duration}?page=${page}  `);

        if(data.results.length > 0){
          settrending((prevState) => [...prevState, ...data.results]);
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
      if(trending.length === 0 ){
        GetTrending()
      }else {
         setpage(1);
         settrending([]);
         GetTrending();
      }
    }


    console.log(trending)

    useEffect(() => {
      refershHandler();

    },[category, duration])

  return trending.length > 0 ? (
    
    <div className=' w-screen h-screen '>
        <div className='px-[5%] w-full   items-center flex justify-between  '>
            <h1 className='text-2xl  text-zinc-400 font-semibold '>
               <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD]"></i>{" "}
               Trending
            </h1>
            <div className='flex items-center w-[80%] '>
              <Topnav />
              <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)}/>
              <div className='w-[2%]'></div>
              <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)}/>
            </div>
            
        </div>
        <InfiniteScroll dataLength={trending.length} next={GetTrending} hasMore={hasMore} loader={<h1>loading.......</h1>}>
           <Cards data={trending} title={category}/>
        </InfiniteScroll>
       

    </div>
    ): (
        <Loading/>
    )
  
}

export default Trending