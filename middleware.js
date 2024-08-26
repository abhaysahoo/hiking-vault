import { withAuth } from "next-auth/middleware";
import { customMiddleware } from "./middlewares/customMiddleware";
import { NextResponse } from "next/server";

export default withAuth(
    async (req) => {
        const customResponse = await customMiddleware(req);
        if(customResponse) return customResponse;

        return NextResponse.next();
    }, 
    {
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async authorized({req, token}) {
            const publicRoutes = ["/"];
            const { pathname } = req.nextUrl;

            // Allow access if the route is public or the user is authenticated
            return publicRoutes.includes(pathname) || !!token;
        }
    }
});

// Specify the routes that should be protected
export const config = {
    matcher: [
        "/((?!api|auth|_next/static|_next/image|favicon.ico|icons|images).*)" // Protect everything in app folder
    ],
};