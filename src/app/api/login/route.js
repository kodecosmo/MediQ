import { nextResponse } from "next/server";

export async function GET() {

    return nextResponse.json({
        this: "GET",
    });
}

export async function POST(request) {

    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    return Response.json({ name, email, password })
}

export async function PUT() {

    return nextResponse.json({
        this: "PUT",
    });
}

export async function DELETE() {

    return nextResponse.json({
        this: "DELETE",
    });
}