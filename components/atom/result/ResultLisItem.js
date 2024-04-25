import Link from "next/link";
import { MdBusiness, MdAttachMoney, MdLocationPin  } from "react-icons/md";


async function ResultListItem ( props ) {
    let isDataEmpty = false;
    const {href, jobId, jobs} = props;
    if (jobs.length === 0) isDataEmpty = true;
    const elemsSide = jobs.map((job) => {
        const {employer, location, plz, street, title, id} = job;
        let style;
        if (id === jobId) {
            style = {
                background: "rgb(203 213 225)",
                border: "2px solid #212129"
            }
        }
        return (      
                <Link key={job.id} href={`${href}&id=${id}`} 
                    className='flex flex-col space-y-3 p-6 rounded-lg border-[#212129] border-10 bg-slate-500
                    transition-all duration-150 ease-in hover:bg-slate-400'
                    style={style}
                >    
                    <p className="text-lg text-slate-800 font-semibold xl:text-base">{title}</p>
                    <p className="flex items-center justify-start xl:text-sm">
                        <MdBusiness className="w-[20px] h-[20px] mr-3" />{employer}
                    </p>
                    <p className='text-slate-900 font-semibold text-sm flex items-center justify-start'>
                        <MdAttachMoney className="w-[20px] h-[20px] mr-3" />45.000$ - 60.000$
                    </p>
                    <p className='text-slate-800 flex items-center justify-start'>
                        <MdLocationPin className="w-[20px] h-[20px] mr-3" />{street? `${street}, `: ""}{plz} {location}
                    </p>
                </Link>
                )
            }
        )

    return (
        <div className='flex flex-col justify-center space-y-2 h-full w-full shadow-sm'>
            {!isDataEmpty ? elemsSide : 
            <div className="text-3xl text-white font-bold h-full flex items-center justify-center">
                No jobs found
            </div>}
        </div>
    )
}

export default ResultListItem