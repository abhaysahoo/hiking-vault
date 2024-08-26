import Business from "@/lib/db/models/business.model";
import connectToDatabase from "@/lib/db/mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/lib/db/models/user.model";


export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ message: "You must have valid session token to access this API route." }, {
            status: 401,
        });
    }
    
    try {
        await connectToDatabase();

        const body = await req.json();
        const newBusiness = await Business.create(body);
        const updatedUser = await User.findByIdAndUpdate(
            session.user?.id,
            { $set: { businessId: newBusiness._id }},
            { new: true, revalidators: true }
        );

        return NextResponse.json({ message: JSON.stringify(newBusiness, updatedUser) }, {
            status: 201,
        });
    } catch (error) {
        console.error('Error while creating business', error);
        return NextResponse.json({ message: 'Something went wrong on the server side' }, {
            status: 500,
        });
    } 
}