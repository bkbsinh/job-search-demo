import { useFormStatus } from "react-dom";

const ApplyButton = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
            className="text-slate-200 text-xl font-semibold"
        >
            {pending? "...Sending" : "Submit"}
        </button>
    )
}

export default ApplyButton
