import { MdAutoFixNormal  } from "react-icons/md";
import Link from "next/link";

const ProfileEditButton = () => {
  return (
    <Link href="/edit_profile">
      <button className="absolute top-2 right-10 bg-[#0b4358] p-2 px-3 flex items-center space-x-2 rounded-lg text-white 
      transition-all duration-500 ease-linear opacity-75
      hover:bg-[#224c5c] hover:scale-110 hover:opacity-100">
          <MdAutoFixNormal className="w-[15px] h-[15px]" />
          <span className="text-white font-semibold text-xs">Edit</span>
      </button>
    </Link>
  )
}

export default ProfileEditButton
