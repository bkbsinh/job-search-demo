const ProfileContainer = ({ children }) => {
  return (
    <div className="relative p-2 m-0 flex flex-col space-y-10 justify-start items-center bg-[#3d3e51] min-h-[94vh]
    md:space-x-10 md:flex-row md:justify-center">
        {children}
    </div>
  )
}

export default ProfileContainer
