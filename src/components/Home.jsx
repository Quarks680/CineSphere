import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import Dropdown from './partials/Dropdown'
import HorizontalCards from './partials/HorizontalCards'
import Loading from './Loading'
function Home() {
    document.title  = "Anurag | database"
    const [wallpaper, setwallpaper] = useState(null);
    const [Trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");
    console.log(wallpaper);

    const GetHeaderWallpaper = async() => {
      try{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day`);
     
        let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
        setwallpaper(randomdata);
        console.log(randomdata);
      }catch (error) {
        console.log("Error: ",error)
      }
    };

    const GetTrending = async() => {
      try{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${category}/day  `);
        setTrending(data.results);
      }catch (error) {
        console.log("Error: ",error)
      }
    };


    useEffect(() => {
      GetTrending();
      !wallpaper && GetHeaderWallpaper();
     
    },[category]);
    console.log(Trending);
  return wallpaper && Trending ? (
    <>
    <Sidenav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
      <Topnav/>
      <Header data={wallpaper}/>
      <div className=' flex justify-between p-5'>
            <h1 className=' text-3xl font-semibold text-zinc-400 '>Trending</h1>
            <Dropdown title="filter" options={['tv',"movie","all"]} func={(e) => setcategory(e.target.value)} />

      </div>
      <HorizontalCards data={Trending }  />
    </div>
    </>
  ): <Loading/>
}

export default Home