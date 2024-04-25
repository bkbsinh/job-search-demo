"use client";

import { useRef } from "react";

const ProfileEditForm = ({ action, children }) => {
    const formRef = useRef();

    return (
        <form ref={formRef} action={action} className="absolute flex items-center justify-center bg-slate-200 w-[40px] h-[35px] top-0 -left-2 rounded-lg
          transition-all duration-500 ease-in opacity-20
          hover:opacity-80"
        >
          <label htmlFor="profile" className="cursor-pointer">
            {children}
          </label>
          <input id="profile" name="profile" type="file" onChange={(e) => {
            if (formRef.current && e.target.files[0]) {
              console.log(e.target.files[0]);
              formRef.current.requestSubmit();
            }
          }} hidden />
        </form>
    )
}

export default ProfileEditForm


