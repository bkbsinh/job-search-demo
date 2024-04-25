const HeroBanner = () => {
  return (
    <div className='relative h-[90vh] flex justify-end items-center bg-[#3d3e51] md:bg-transparent'>
      <video className="hidden object-cover absolute top-0 h-full w-full z-[-100] opacity-70 md:block" 
        muted loop autoPlay
        src="/assets/theme.mp4">
      </video>
      
      <div className='flex flex-col w-full p-10 justify-center items-center space-y-7 mx-auto md:mx-0 md:w-1/2'>
        <p className='text-4xl text-slate-200 font-bold sm:text-5xl text-left md:text-[#212129]'>
          Start looking for your dream jobs
        </p>
        <p className='text-lg text-slate-400 md:text-[#212129] text-left'>
          sIT keeps you in touch with the actual jobs collected from a trust-worthy source, i. e. Bundesagentur für Arbeit.<br /> 
          Start looking for your dream positions right now
        </p>
      </div>
    </div>
  )
}

export default HeroBanner
