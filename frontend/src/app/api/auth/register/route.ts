import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const data = await request.json();
    try {
        await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}/api/users/auth/register/`, data);
        return NextResponse.json({"test": "test"}, {status: 200});
    } catch (error: any) {
        const {response} = error;
        const {status, data} = response;
        return NextResponse.json(data, {status});
    }
}
