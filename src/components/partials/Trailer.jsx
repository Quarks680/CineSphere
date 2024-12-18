import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector, useLocation } from 'react-redux'
import Notfound from '../Notfound';


function Trailer() {
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    console.log(ytvideo);

  return ytvideo ?  (
    <div className='bg-[rgba(0,0,0,.9)] absolute z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center'>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>
    </div>
  ) : <Notfound/>;
}

export default Trailer