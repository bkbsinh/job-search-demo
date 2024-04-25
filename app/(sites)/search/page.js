
import ResultJobContent from "@/components/mol/result/ResultJobContent";
import ResultContainer from "@/components/organ/ResultContainer";
import ResultHeader from "@/components/mol/result/ResultHeader";
import ResultListItem from "@/components/atom/result/ResultLisItem";
import ResultSidebar from "@/components/mol/result/ResultSidebar";

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

  // const { data, error } = useSWR(url, fetcher, {
  //   revalidateOnFocus: false
  // });

async function ResultPage({searchParams}) {
  const position = searchParams.position;
  const location = searchParams.location;
  const isIdGiven = searchParams.id;
  let jobId = "";

  if (isIdGiven) jobId = isIdGiven;

  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/jobs?" + new URLSearchParams({
    position: position,
    location: location
  })
  const res = await fetch(url, {
  next: {
      revalidate: 60*10
  }
  });
  const data = await res.json();

  const currentHref = "/search?" + new URLSearchParams({
      position: position,
      location: location
    })

  return (
    // <div className="flex flex-col p-5 space-y-10  bg-[#3d3e51]">
      <ResultContainer>
          <ResultSidebar>
            <ResultListItem href={currentHref} jobs={data} jobId={jobId} />
          </ResultSidebar>
          <ResultJobContent jobId={jobId} />
      </ResultContainer>
    // </div>
  )
}

export default ResultPage
