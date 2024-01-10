import { getServerSession } from "next-auth";
import axios from "axios";
import { NextResponse } from "next/server";
import AuthOptions, { BACKEND_URL } from "../../auth/[...nextauth]/AuthOptions";

export async function GET(req: Request) {
    const session = await getServerSession(AuthOptions);
    const {access} = session as any;

    try {
        const {data} = await axios.get(
            `${BACKEND_URL}/api/watchlists/`,
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
            `${BACKEND_URL}/api/watchlists/`,
            await req.json(),
            {headers: {Authorization: `Bearer ${access || ""}`}}
        )
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        const {response: {data}} = error;
        return NextResponse.json(data, {status: 400});
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(AuthOptions);
    const {access} = session as any;
    
    try {
        const {searchParams} = new URL(req.url);
        const {data} = await axios.delete(
            `${BACKEND_URL}/api/watchlists/?key=${searchParams.get("key")}`,
            {headers: {Authorization: `Bearer ${access || ""}`}}
        )
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        const {response: {data}} = error;
        return NextResponse.json(data, {status: 400});
    }
}