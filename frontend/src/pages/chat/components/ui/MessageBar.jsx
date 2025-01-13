import React from 'react'

function MessageBar() {
  return (
    <div className='h-[10vh] flex justify-center items-center px-8 mb-6 gap-6'>
        <div className="flex-1 flex rounded-md items-center justify-center gap-5 pr-5">
            <input type="text" className='flex-1 p-5 rounded-md focus:border-none focus:outline-none' />
        </div>
    </div>
  )
}

export default MessageBar
