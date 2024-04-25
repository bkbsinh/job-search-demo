"use server";

import { generateJWT } from "../utils/encrypt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function uploadProfileImage(formData) {
    const session = await getServerSession(authOptions);
    const token = session?.token;
    const encrypted_token = await generateJWT(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pr/user/img`, {
        method: 'POST',
        headers: {
            'X-Access-Token': encrypted_token
        },
        body: formData
    });

    revalidatePath("/")
}