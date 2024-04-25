"use client";

import { useRef } from "react";

const ResumeEditForm = ({ action, children }) => {
    const formRef = useRef();

    return (
        <form ref={formRef} action={action} className="py-3 px-4 bg-slate-300 rounded-lg">
            <label htmlFor="resume" className="font-bold text-[#212129] cursor-pointer flex items-center">
                {children}
            </label>
            <input id="resume" name="resume" type="file" onChange={(e) => {
                if (formRef.current && e.target.files[0]) {
                console.log(e.target.files[0]);
                formRef.current.requestSubmit();
                }
            }} hidden />
        </form>
    )
}

export default ResumeEditForm


