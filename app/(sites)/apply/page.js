import fetchJobData from "@/lib/actions/fetchJob";
import fetchUserData from "@/lib/actions/fetchUser";
import { MdBusiness, MdAttachMoney, MdLocationPin } from "react-icons/md";
import ApplyForm from "@/components/mol/apply/ApplyForm";

const ApplyPage = async ({ searchParams }) => {
    const jobId = searchParams.id;
    const jobData = await fetchJobData(jobId);
    const user = await fetchUserData();
    const { title, street, employer, plz, location } = jobData;
    return (
        <div className="flex items-center space-y-3 flex-col bg-[#2e3143] min-h-screen">
            <p className="text-3xl text-slate-200 pt-10 font-semibold text-center">
                {title}
            </p>
            <p className="flex items-center justify-start text-slate-200">
                <MdBusiness className="w-[20px] h-[20px] mr-3" />{employer}
            </p>
            <p className='font-semibold text-sm flex items-center justify-start text-slate-200'>
                <MdAttachMoney className="w-[20px] h-[20px] mr-3" />45.000$ - 60.000$
            </p>
            <p className='flex items-center justify-start text-slate-200'>
                <MdLocationPin className="w-[20px] h-[20px] mr-3" />{street? `${street}, `: ""}{plz} {location}
            </p>
            <ApplyForm user={user} id={jobId} />
        </div>
    )
}

export default ApplyPage
