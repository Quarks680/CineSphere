import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

function Popular() {

    document.title = "AM | Popular" ;


    const navigate = useNavigate()
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetPopular = async() => {
        try{
          const { data } = await axios.get(`${category}/popular?page=${page}  `);

          console.log(data);
  
          if(data.results.length > 0){
            setpopular((prevState) => [...prevState, ...data.results]);
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
        if(popular.length === 0 ){
          GetPopular()
        }else {
           setpage(1);
           setpopular([]);
           GetPopular();
        }
      }
  
  
      console.log(popular)
  
      useEffect(() => {
        refershHandler();
  
      },[category])

  return (
    popular.length > 0 ? (
    
      <div className=' w-screen h-screen '>
          <div className='px-[5%] w-full   items-center flex justify-between  '>
              <h1 className='text-2xl  text-zinc-400 font-semibold '>
                 <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD]"></i>{" "}
                 Popular
              </h1>
              <div className='flex items-center w-[80%] '>
                <Topnav />
                <Dropdown title="Category" options={["tv","movie"]} func={(e) => setcategory(e.target.value)}/>
                <div className='w-[2%]'></div>
                
              </div>
              
          </div>
          <InfiniteScroll dataLength={popular.length} next={GetPopular} hasMore={hasMore} loader={<h1>loading.......</h1>}>
             <Cards data={popular} title={category}/>
          </InfiniteScroll>
         
  
      </div>
      ): (
          <Loading/>
      )
  )
}

export default Popular