
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import axios from '../utils/axios';


function Movie() {

    document.title = "AM | Movies" ;


    const navigate = useNavigate()
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([])
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetMovie = async() => {
        try{
          const { data } = await axios.get(`/movie/${category}?page=${page}  `);

          console.log(data);
  
          if(data.results.length > 0){
            setmovie((prevState) => [...prevState, ...data.results]);
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
        if(movie.length === 0 ){
          GetMovie()
        }else {
           setpage(1);
           setmovie([]);
           GetMovie();
        }
      }
  
  
      console.log(movie)
  
      useEffect(() => {
        refershHandler();
  
      },[category])

  return (
    movie.length > 0 ? (
    
        <div className=' w-screen h-screen '>
            <div className='px-[5%] w-full   items-center flex justify-between  '>
                <h1 className='text-2xl  text-zinc-400 font-semibold '>
                   <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD]"></i>{" "}
                   Movie<small className='text-sm text-zinc-400 ml-2'>({category})</small>
                </h1>
                <div className='flex items-center w-[80%] '>
                  <Topnav />
                  <Dropdown title="Category" options={["popular","top_rated", "upcoming","now_playing"]} func={(e) => setcategory(e.target.value)}/>
                  <div className='w-[2%]'></div>
                  
                </div>
                
            </div>
            <InfiniteScroll dataLength={movie.length} next={GetMovie} hasMore={hasMore} loader={<h1>loading.......</h1>}>
               <Cards data={movie} title="movie"/>
            </InfiniteScroll>
           
    
        </div>
        ): (
            <Loading/>
        )
  )
}

export default Movie