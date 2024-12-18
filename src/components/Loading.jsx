import React from 'react'

import loader from "/loader.jpg";

function Loading() {
  return (
    <div className='w-screen h-screen  flex justify-center items-center bg-black'>
        <img className='scale-150' src={loader} alt="" />
    </div>
  )
}

export default Loading