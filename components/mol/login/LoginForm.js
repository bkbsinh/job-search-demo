"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { LuMail, LuFileLock2  } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("user -> ", user);
        signIn("credentials", {
            email: user.email,
            password: user.password,
            // redirect: false,
          });

        router.push("/profile");
      }
    return (
        <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl mx-auto bg-slate-200 px-5 py-10 space-y-6 md:w-3/4 lg:w-2/3 xl:w-3/5"
        >
            <div className="flex flex-col w-full lg:px-5">
                <label className="text-lg font-semibold text-slate-600">Email</label>
                <div className="bg-white flex items-center py-3 px-4 rounded text-slate-600 text-lg mt-1">
                    <LuMail />
                    <input
                        type={"email"}
                        placeholder="example@123.com"
                        name="email"
                        className="outline-none w-full px-4"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full lg:px-5">
                <label className="text-lg font-semibold text-slate-600">Password</label>
                <div className="bg-white flex items-center py-3 px-4 rounded text-slate-600 text-lg mt-1">
                <LuFileLock2 />
                <input
                    type="password"
                    placeholder="**********"
                    name="password"
                    className="outline-none w-full px-4"
                    value={user.password}
                    onChange={handleInputChange}
                />
            </div>
            <button
                type="submit"
                className="bg-[#5D7DF3] text-white text-lg py-3 mt-6 mx-auto w-[150px] rounded-md font-semibold"
                >
                Sign In
            </button>
            <div className="flex justify-center w-full items-center gap-3 py-3">
                <div className="border-b border-gray-800 py-2 w-full px-6" />
                    <div className="mt-3">or</div>
                    <div className="border-b border-gray-800 py-2 w-full px-6" />
                    </div>
                <div className="flex justify-center items-center w-full gap-8 pb-8">

                    <div onClick={()=>signIn("google")} className="rounded-md px-6 py-2 shadow cursor-pointer bg-gray-50 grid place-items-center mx-auto mb-4">
                        <img src="/assets/google2.svg" alt="bg" width={100} height={100} />
                    </div>{" "}
                </div>
                <div className="text-lg text-slate-900 font-medium text-center">
                    <span>Don't have an account?</span>
                    <Link
                        href="/signup"
                        className="text-[#5D7DF3] pl-3 hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </form>
  )
}

export default LoginForm
