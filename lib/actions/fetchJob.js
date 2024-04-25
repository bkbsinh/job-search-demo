export default async function fetchJobData(jobId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job/${jobId}`);
    const data = await res.json();

    return data
}