import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import connectToDatabase from "@/lib/db/mongoose";
import User from "@/lib/db/models/user.model";

export const authOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            // user object only exists during signin, for subsequent requests jwt callback only receives token
            if (user) {
                await connectToDatabase(); // Connect to your MongoDB
                const existingUser = await User.findOne({ email: user.email });

                // If the user exists, attach the MongoDB _id to the token
                if (existingUser) {
                    token.id = existingUser._id;
                    token.role = existingUser.role;
                    token.businessId = existingUser.businessId;
                } else {
                    // Handle the case where the user is being created (if needed)
                    // You might create the user here or just let it happen elsewhere
                }
            }

            return token;
        },

        async session({ session, token }) {
            // Attach the MongoDB _id to session.user.id
            session.user.role = token.role;
            session.user.businessId = token.businessId;
            session.user.id = token.id;
            return session;
        },

        async signIn({ user }) {
            await connectToDatabase();

            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                // If the user doesn't exist, create them in MongoDB
                // control enters if block only when admin is created
                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: 'admin',
                    businessId: null,
                    // Add other fields as necessary
                });
            }

            return true;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }