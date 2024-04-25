import Link from "next/link";

const NavLink = ({ href, children }) => {
  return (
    <Link href={href} className="flex items-center justify-center p-3 font-semibold text-slate-300 text-lg 
    transition-all duration-500 ease-linear hover:text-white hover:scale-110">
        { children }
    </Link>
  )
}

export default NavLink
