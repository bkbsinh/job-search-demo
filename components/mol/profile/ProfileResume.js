import { MdPictureAsPdf, MdFileUpload, MdBorderColor  } from "react-icons/md";
import uploadCV from "@/lib/actions/uploadCV";
import ResumeEditForm from "../../atom/result/ResumeEditForm";

const ProfileResume = ({ user }) => {
  const pdfUrl = user.resume ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user.id}/${user.resume}` : "";
  console.log("PDF -> ", pdfUrl);
  return (
    <div className="p-2 flex flex-col justify-center items-center w-3/4 space-y-8 md:items-start md:w-1/2">
        <p className="text-2xl font-extrabold text-slate-200 lg:text-3xl">
          {user.name}
        </p>
        <p className="text-slate-300 font-semibold text-center lg:text-xl">
          {user.email}
        </p>
        <p className="text-slate-300 font-light text-sm text-center lg:text-base md:text-left">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        </p>
        {pdfUrl ?          
          <div className="flex items-center justify-between w-full bg-slate-300 rounded-lg">
            <a target="_blank" href={pdfUrl}>
              <div className="flex items-center space-x-3 py-3 px-4">
                <MdPictureAsPdf className="w-[30px] h-[30px]" />
                <span className="font-bold text-[#212129]">{user.resume}</span>
              </div>  
            </a>
            <ResumeEditForm type="resume" action={uploadCV}>
              <MdBorderColor className="w-[25px] h-[25px] opacity-75" />
            </ResumeEditForm>
          </div>
          :
          <ResumeEditForm type="resume" action={uploadCV}>
            <MdFileUpload className="w-[30px] h-[30px] mr-3" /> Upload CV
          </ResumeEditForm>
        }
    </div>
  )
}

export default ProfileResume
