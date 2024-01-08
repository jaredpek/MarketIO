import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize: async (credentials, request) => {
                const {username, password} = credentials as {
                    username: string,
                    password: string,
                }
                try {
                    const user = await axios.post(
                        `${process.env.NEXTAUTH_BACKEND_URL}/api/users/auth/login/`,
                        {username, password}
                    )
                    .then(response => {
                        const {status, data} = response.data;
                        if (status === "success") {
                            const {access, refresh} = data;
                            return {
                                id: access,
                                access, refresh,
                            }
                        }
                    })
                    return user || null;
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    pages: {
        signIn: "/user/auth/login",
        newUser: "/user/auth/register",
    }
}

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}
