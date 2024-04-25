import React from 'react'

const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className='rounded-full bg-[#40445a] text-white p-2 px-6 font-semibold
    transition-all duration-500 ease-linear hover:scale-110'>
      { children }
    </button>
  )
}

export default Button
