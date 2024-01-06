import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const response = await axios.post(
                    `${process.env.NEXTAUTH_BACKEND_URL}/users/auth/login/`,
                    credentials
                )
                if (!response.ok) return null;
                return await response.json();
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
          })
    ]
})
