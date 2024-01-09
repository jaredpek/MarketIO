import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    const session = getServerSession();
    console.log(session);
    return NextResponse.json({"test": "test"});
}