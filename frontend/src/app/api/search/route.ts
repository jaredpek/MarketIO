import axios from "axios";
import { NextResponse } from "next/server";
import { BACKEND_URL } from "../auth/[...nextauth]/AuthOptions";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    
    try {
        const {data} = await axios.get(`${BACKEND_URL}/api/search/?${searchParams.toString()}`)
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        const {response: {data}} = error;
        return NextResponse.json(data, {status: 400});
    }
}
