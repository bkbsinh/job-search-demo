const ResultSidebar = ({ children }) => {
  return (
    <div className="overflow-y-auto pr-3 flex flex-col w-full lg:w-1/2 xl:w-2/5">
        {children}
    </div>
  )
}

export default ResultSidebar
