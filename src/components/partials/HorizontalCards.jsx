import React from 'react'
import noimage from '/McDowells.jpg'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function HorizontalCards({ data, category }) {
    console.log(data);
  return (
     
        <div className='w-[100%] flex h-[40vh] overflow-y-hidden py-2 mb-5 p-5 '>
           {data.length > 0 ?  data.map((d,i) => (
            <Link to={`/${d.media_type || category}/details/${d.id}}`} key={i} className='min-w-[15%] mr-5 mb-5 h-full bg-zinc-900 '>
                <img className='w-full h-[55%]  object-center rounded-t-md' src={d.backdrop_path || d.profile_path || d.poster_path?`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path || d.poster_path}`:noimage}alt="" />
                <div className='text-white p-3 h-[45%] overflow-y-auto'>
                    <h1 className=' text-xl font-semibold '>{d.title || d.name || d.original_name || d.original_title}</h1>
                    <div className='h-[50px] overflow-hidden'>
                        <p className=' '>{d?.known_for?.at(0)?.overview.slice(0, 50) || d?.overview?.slice(0, 50) }...<span className="text-zinc-500">more</span> </p>
                    </div>
                </div>
               
               
            </Link>)) : <h1 className='text-3xl text-white font-black text-center'>Nothing to show</h1>}

        </div>

   
  )
}

export default HorizontalCards