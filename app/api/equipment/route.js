import Equipment from "@/lib/db/models/equipment.model";
import connectToDatabase from "@/lib/db/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You must have valid session token to access this API route." }, {
            status: 401,
        });
    }

    const businessId = session.user.businessId;
    const trip = [];

    try {
        await connectToDatabase();

        const { name, category, image } = await req.json();
        const newEquipment = await Equipment.create({
            name,
            businessId,
            category,
            image,
            trip,
        });

        console.log('Equipment added successfully');
        return NextResponse.json(newEquipment, { status: 201 });
    } catch(error) {
        console.error('Error while creating an equipment', error);
        return NextResponse.json({ err: error, message: 'Something is wrong on the server side'}, {
            status: 500,
        });
    }
}

export const GET = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You must have valid session token to access this API route." }, {
            status: 401,
        });
    }


    try {
        await connectToDatabase();

        const allEquipments = await Equipment.find({ businessId: session.user.businessId });

        console.log('Equipments fetched successfully');
        return NextResponse.json({ allEquipments }, { status: 200 });
    } catch (error) {
        console.error('Error while fetching all equipments related to a business', error);
        return NextResponse.json({ err: error, message: 'Something is wrong on the server side' }, {
            status: 500,
        });
    }
}