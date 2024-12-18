import React from 'react';
import { Link } from 'react-router-dom';

function Header({ data }) {

  console.log(data);
   
  return (
    <div style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }} className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>
        <h1 className='w-[70%] text-5xl font-black text-white '>{data.original_title || data.title || data.name || data.original_name}</h1>
        <p className='w-[70%] mt-3 mb-3 text-white'>{data.known_for?.at(0)?.overview.slice(0, 200) || data.overview.slice(0, 200)}... <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link></p>
        <p className='text-white flex gap-x-5'>
          <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
          {data.first_air_date || data.release_date || "No Information"}
          <i className="text-yellow-500 ri-play-large-fill"></i> {data.media_type.toUpperCase()}
        </p>
        <Link className='bg-[#6556CD] p-4 rounded text-white font-semibold mt-5'>Watch Trailer</Link>
    </div>
  )
}

export default Header