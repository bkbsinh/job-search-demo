import ResultDetail from "../../atom/result/ResultDetail";
import ResultDetailEmpty from "../../atom/result/ResultDetailEmpty";

const ResultJobContent = ({ jobId }) => {
  return (
    <>
      {jobId?
            (<ResultDetail id={jobId} />)
          :
            (<ResultDetailEmpty />)
          }
    </>
  )
}

export default ResultJobContent
