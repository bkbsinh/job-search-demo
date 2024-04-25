"use server";

import { getServerSession } from "next-auth";
import { generateJWT } from "../utils/encrypt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const generateFreshToken = () => {
    const session = getServerSession(authOptions);
    return generateJWT(session?.token)
}

export async function saveJob(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pr/job`, {
        method: "POST",
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json',
            'X-Access-Token': generateFreshToken()
        },
        body: formData
    })
}

export async function removeJob(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pr/job`, {
        method: "DELETE",
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json',
            'X-Access-Token': generateFreshToken()
        },
        body: formData
    })
}