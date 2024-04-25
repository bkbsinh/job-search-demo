import Link from "next/link";
import { MdOutlineNearMe } from "react-icons/md";


async function ResultDetail({ id }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${id}`, {
    next: {
      revalidate: 60*60
    }
  });
  const data = await res.json();

  const { publicDate, title } = data
  return (
    <div className="border-[#212129] bg-slate-300 border-2 rounded-lg overflow-y-auto no-scrollbar hidden lg:w-3/5 lg:flex lg:flex-col xl:w-2/3">
        <div className="flex flex-col items-center justify-center p-7 px-2 space-y-3 sticky top-0 bg-slate-300">
          {/* <img
            src={`/assets/background/${randomNumber}.jpg`}
            className='max-h-[210px] w-auto'
          /> */}
            <p className='text-3xl font-extrabold text-[#212129] text-center'>
              {title}
            </p>
            <p className='text-[#212129] font-light italic'>
              publiced since {publicDate}
            </p>
            <Link href={`/apply?id=${id}`} 
              className="flex items-center justify-center bg-[#2e3143] rounded-lg p-3 px-4 text-slate-100 font-bold text-lg"
            >
              <MdOutlineNearMe className="h-[24px] w-[24px] mr-3" />Apply
            </Link>
            <hr className="border-slate-400 border w-3/4" />
        </div>
        <div className="text-base font-light text-justify p-3">
          <span className="font-semibold">About Us</span>
          <p className="text-slate-800 mt-2 mb-6 text-sm p-3">
            We are a rapidly growing startup in the tech industry, specializing in AI-driven solutions for optimizing digital marketing campaigns. Our innovative platform empowers businesses to maximize their online presence and drive tangible results through data-driven strategies.
          </p>
          <span className="font-semibold">Job Description</span>
          <p className="text-slate-800 mt-2 mb-6 text-sm p-3">
            As a Marketing Growth Specialist, you will play a crucial role in expanding our client base and increasing market penetration. Your primary responsibility will be to devise and execute strategic initiatives aimed at driving user acquisition, engagement, and retention. You will collaborate closely with cross-functional teams to develop and implement data-driven marketing campaigns, leveraging analytics to identify growth opportunities and optimize performance. Additionally, you will conduct market research, monitor industry trends, and provide actionable insights to inform product development and marketing strategies.
          </p>
          <span className="font-semibold">Your Responsibilities</span>
          <p className="text-slate-800 mt-2 mb-6 text-sm p-3">
            Develop and execute comprehensive marketing plans to drive user acquisition, engagement, and retention.
            Conduct market research to identify target audiences, market trends, and competitive landscape.
            Collaborate with cross-functional teams to create compelling marketing content and collateral.
            Utilize analytics tools to track key performance metrics and optimize campaign performance.
            Implement A/B testing and other experimental methodologies to refine marketing strategies.
          </p>
          <span className="font-semibold">What you should bring with</span>
          <p className="text-slate-800 mt-2 mb-6 text-sm p-3">
            Bachelor's degree in Marketing, Business Administration, or related field (or equivalent experience).
            Strong analytical skills, with proficiency in data analysis and interpretation.
            Experience with marketing automation tools, analytics platforms, and CRM systems.
            Creative thinker with a strategic mindset and a passion for driving results.
            Prior experience in the tech industry or with AI-driven solutions is a plus.
          </p>
        </div>
    </div>
  )
}

export default ResultDetail
