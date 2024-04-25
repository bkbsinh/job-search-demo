"use client";

import applyJob from "@/lib/actions/apply";
import { MdOutlineNearMe, MdPictureAsPdf } from "react-icons/md";
import ApplyButton from "../../atom/button/ApplyButton";
import { useRouter } from "next/navigation";

const ApplyForm = ({ id, user }) => {
    const router = useRouter();
    const pdfUrl = user.resume ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user.id}/${user.resume}` : "";
    return (
        <form action={async(formData) => {
                await applyJob(formData);
                router.back();
            }} className="px-5 py-10 flex flex-col text-slate-200 w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
            <input id="jobId" name="jobId" readOnly value={id} hidden />
            <label className='font-semibold text-slate-200 mb-4' htmlFor="msg">
                Anschreiben <span className="text-sm font-light text-slate-300">(optional)</span>
            </label>
            <textarea id="msg" name="msg"
                className="text-[#212129] p-3 flex flex-wrap min-h-[300px] rounded-xl w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-[#212129] bg-slate-400" 
            ></textarea>
            <div className="mt-8 flex items-center justify-between w-full bg-slate-400 rounded-xl">
                <a target="_blank" href={pdfUrl}>
                <div className="flex items-center space-x-3 py-3 px-4 text-[#212129]">
                    <MdPictureAsPdf className="w-[30px] h-[30px]" />
                    <span className="font-bold">{user.resume}</span>
                </div>  
                </a>
            </div>
            <div className="p-3 px-4 mx-auto mt-8 flex items-center bg-[#212129] min-w-[100px] rounded-xl">
                <MdOutlineNearMe className="h-[24px] w-[24px] mr-3" />
                <ApplyButton />
            </div>
        </form>
    )
}

export default ApplyForm
