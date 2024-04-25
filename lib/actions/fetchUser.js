import { generateJWT } from "../utils/encrypt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function fetchUserData() {
    const session = await getServerSession(authOptions);
    const token = session?.token;
    const encrypted_token = await generateJWT(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user_info`, {
        method: "GET",
        headers: {
            "X-Access-Token": encrypted_token,
        },
    });
    const data = await res.json();
    const user = data?.user;

    return user
}