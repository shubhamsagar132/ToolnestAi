import React, { useState } from 'react';
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setexpanded] = useState(false)
  
  return (
    <div onClick={()=>setexpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='text-base font-medium'>{item.prompt}</h2>
          <p className='text-gray-500 text-xs mt-1'>
            {item.type} - {new Date(item.created_at).toLocaleDateString()} 
          </p>
        </div>
        <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 text-xs rounded-full capitalize'>
          {item.type}
        </button>
      </div>
{
  expanded &&(
    <div>
      {item.type==='image'?(
        <div>
          <img src="{item.content" alt="image" className='mt-3 w-full max-w-md'/>
        </div>

      ):(
        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
          <div className='reset-tw'>
            <Markdown>{item.content}</Markdown>
          </div>

        </div>
      )}
    
    </div>
  )
}
    </div>
  );
};

export default CreationItem
