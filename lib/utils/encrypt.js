import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET
  );

export async function generateJWT(token) {
    return await new SignJWT(token) 
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("1 day") 
        .sign(secret);
}