import Link from "next/link";
import { SocialIcon } from 'react-social-icons';

const NavLink = ({ icon, href, children }) => {
  return (
    <div className="flex items-center justify-start">
      { icon && (
        <SocialIcon style={{width: '30px', height: '30px'}} url={`https://${icon}.com`} />
      )}
      <Link href={href} className="flex items-center p-1 font-semibold text-[#212129]
      transition-all duration-500 ease-linear hover:text-black">
          { children }
      </Link>
    </div>
  )
}

export default NavLink
