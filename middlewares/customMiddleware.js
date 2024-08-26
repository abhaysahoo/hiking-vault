import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function customMiddleware(req) {
    const token = await getToken({ req });

    if(token?.role === 'admin' && !token?.businessId) {
        let url = req.nextUrl.pathname;

        if(url === '/auth/create-business') {
            return NextResponse.next();
        }

        url = req.nextUrl.clone();
        url.pathname = '/auth/create-business';
        return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
}