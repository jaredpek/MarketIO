import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import axios from "axios";
import AuthOptions, { BACKEND_URL } from "../../auth/[...nextauth]/AuthOptions";

export async function GET(req: Request) {
    const session = await getServerSession(AuthOptions);
    const {access} = session as any;

    try {
        const {data} = await axios.get(
            `${BACKEND_URL}/api/users/profile/`,
            {headers: {Authorization: `Bearer ${access || ""}`}}
        )
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        const {response: {data}} = error;
        return NextResponse.json(data, {status: 400});
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(AuthOptions);
    const {access} = session as any;

    try {
        const {data} = await axios.post(
            `${BACKEND_URL}/api/users/profile/`,
            await req.json(),
            {headers: {Authorization: `Bearer ${access || ""}`}}
        )
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        const {response: {data}} = error;
        return NextResponse.json(data, {status: 400});
    }
}
