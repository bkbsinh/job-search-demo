import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const fd = new FormData();
        fd.append("email", email);
        fd.append("pwd", password);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check_user`, {
            method: "POST",
            body: fd
          });
          if (response.status === 200) {
            const data = await response.json();
            const user = data.user;
            return user
          };
          return false
        } catch (error) {
          console.log(error);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account.provider === "google") {
        const fd = new FormData();
        fd.append("email", profile.email);
        fd.append("name", profile.name);
        fd.append("credential", "google");

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user?`, {
            method: "POST",
            body: fd
          });
          const data = await response.json();
          const currentUser = data.user;
          user.id = currentUser.id;
          user.image = currentUser.profile;
          return user
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
        }
      }
      return user
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, account }) {
      session.token = token;
      if (session.user) {
        session.user.image = token.picture
        session.user.id = token.id
      }
      return session;
    },
    pages: {
      signIn: "/login",
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }