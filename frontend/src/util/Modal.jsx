import React from 'react'

function Modal({children}) {
  return (
    <div className='flex justify-center items-center h-[90vh] w-[100vw]'>
        <div className='flex justify-center items-center bg-white border-2 border-white shadow-2xl h-[80vh] w-[80vw] text-opacity-90 rounded-3xl md: w-[90vw] lg:w-[70vw] xl:w-[40vw] '>
           {children}
        </div>
      
    </div>
  )
}

export default Modal
