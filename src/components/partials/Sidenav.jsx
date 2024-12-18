import React from 'react'
import { Link } from 'react-router-dom'

function Sidenav() {
  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-6 '>
      <h1 className='text-2xl text-white font-bold'>
        <i className="ri-tv-fill   text-[#6556CD] mr-2"></i>
        <span className=' '>AM</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-lg gap-3'>
         <h1 className='text-white font-semibold text-xl mt-6 mb-5 '>New Feeds</h1>
         <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-fire-fill mr-2"></i>Treading
         </Link >
         <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-bard-fill mr-2"></i>Popular
         </Link>
         <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-film-fill mr-2"></i>
          Movies
         </Link>
         <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-tv-2-fill mr-2"></i>
          Tv Shows
         </Link>
         <Link to="/people" className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-team-fill mr-2"></i>
          People
         </Link>
      </nav>
      <hr className='border-none h-[1px] bg-zinc-400 mt-1' />
      <nav className='flex flex-col text-zinc-400 text-lg gap-3'>
      <h1 className='text-white font-semibold text-xl mt-10 mb-5 '>Web Information</h1>
         <Link className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-information-fill mr-2"></i>About AM
         </Link >
         <Link className='hover:bg-[#6556CD] hover:text-white rounded-md duration-300 p-4 '>
         <i className="ri-contacts-fill mr-2"></i>Contact Us
         </Link>
      </nav>
      

        
    </div>
  )
}

export default Sidenav