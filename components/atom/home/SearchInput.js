"use client";

import { useState } from "react";

const SearchInput = ( { id, pH, isMandatory, name }) => {
  const [val, setVal] = useState("");

  return (
    <div className='flex flex-col items-center space-y-2 mb-10 w-full'>
      <label className='text-lg font-semibold text-slate-200' htmlFor={id}>
        {id.toUpperCase()} {isMandatory && (
          <span className='text-red-500'>*</span>
        )}
      </label>
      <input
        name={name}
        type="text"
        defaultValue={val}
        onChange={(event) => {setVal(event.target.value)}}
        id={id} placeholder={pH} 
        className='h-[50px] bg-slate-300 p-4 text-center rounded-full w-full sm:w-3/4 md:w-2/3 lg:w-full
        border border-gray-600 focus:border-2 focus:border-gray-800 focus:outline-none focus:ring-0' 
      />
    </div>
  )
}

export default SearchInput
