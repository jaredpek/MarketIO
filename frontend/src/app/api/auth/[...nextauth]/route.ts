import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const signInHandlers = {
    "credentials": async (user: any, account: any, profile: any, email: any, credentials: any) => {
        return true;
    },
    "google": async (user: any, account: any, profile: any, email: any, credentials: any) => {
        try {
            await axios.post(
                `${process.env.NEXTAUTH_BACKEND_URL}/api/users/auth/login/google/`,
                account
            ).then(({data}) => {
                if (data.status === "success") {
                    const {access, refresh, created, expires} = data.data;
                    account.meta = {
                        access, refresh, created, expires,
                        id: access,
                    }
                }
            })
            return true;
        } catch (error) {
            return false
        }
    }
}
const signInProviders: string[] = Object.keys(signInHandlers);

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: (30 * 24 * 60 - 1) * 60
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
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
                    ).then(response => {
                        const {status, data} = response.data;
                        if (status === "success") {
                            const {access, refresh, created, expires} = data;
                            return {
                                access, refresh, created, expires,
                                id: access,
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
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    pages: {
        signIn: "/user/auth/login",
        newUser: "/user/auth/register",
    },
    callbacks: {
        signIn: async ({user, account, profile, email, credentials}) => {
            if (!account?.provider || !signInProviders.includes(account.provider)) return false;
            return signInHandlers[account.provider as keyof typeof signInHandlers](
                user, account, profile, email, credentials
            );
        },
        jwt: async ({user, token, account}) => {
            if (user && account) {
                const {access, created, expires}: any = (account.provider === "credentials") ? user : account.meta;
                const tokenData: JWT = {
                    sub: access,
                    iat: created,
                    exp: expires,
                }
                return tokenData;
            }
            return token;
        },
    }
}

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}
