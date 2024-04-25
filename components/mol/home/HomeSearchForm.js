"use client";

import SearchInput from "@/components/atom/home/SearchInput";
import SubmitButton from "@/components/atom/button/SubmitButton";
import { useRef } from "react";
import { useObserver } from "@/lib/hooks/useObserver";

const Form = () => {
    // const containerRef = useRef(null);
    // useObserver(containerRef);

    return (
        <div className="bg-[#3d3e51] my-0 p-5 flex flex-col space-y-6 lg:flex-row">
            
            <div className="p-5 pr-14 space-y-10 justify-start lg:w-1/2 lg:flex lg:flex-col">
                <p className="text-slate-200 font-bold text-3xl text-left">
                    SEARCHING
                </p>
                <p className="font-light text-slate-400 space-y-10 text-sm">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                </p>       
            </div>
            <form 
                action="/search"
                className="flex flex-col items-center w-full lg:w-1/2 pl-5"
            >
                <SearchInput isMandatory={true} id="position" name="position" pH="e. g. Webentwickler" />
                <SearchInput id="location" name="location" pH="e. g. Frankfurt" />
                <SubmitButton />
            </form>
            {/* <p className="text-center font-light text-slate-200 text-sm mt-7">
                <span className="text-red-500">*</span> mandatory field
            </p> */}
        </div>
    )
}

export default Form
