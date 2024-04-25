"use client";

import NavLink from "../atom/NavLink";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import CommonButton from "../atom/button/CommonButton";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <section className="flex justify-between items-center h-14 p-6 py-8 
      transition-all duration-300 ease-linear bg-[#212129]"
    >
      <Link href="/"><img src="/assets/dsa_logo.png" className="h-[55px] w-auto cursor-pointer rounded-full" /></Link>

      <NavLink href="/about">
        About
      </NavLink>

      <NavLink href="/ref">
        Referrences
      </NavLink>

      {session?.user ? (
        <>  
          <Link href="/profile" className="transition-all duration-300 ease-in hover:scale-125">
            <img
                src={session.user.image === "default.avif" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/default.avif`:
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${session.user?.id}/${session.user.image}`}
                width={40}
                height={40}
                className='rounded-full'
                alt='profile'
              />
          </Link>
          <CommonButton onClick={signOut}>
            Sign Out
          </CommonButton>
        </>
      ): (
        <CommonButton onClick={signIn}>
            Sign In
          </CommonButton>
      )}
      
    </section>
  )
}

export default Nav
