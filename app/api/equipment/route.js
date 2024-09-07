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

export const GET = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You must have a valid session token to access this API route." }, {
            status: 401,
        });
    }

    try {
        await connectToDatabase();

        const { searchParams } = req.nextUrl;
        const page = searchParams.get('page') || 1;
        const searchText = searchParams.get('query') || "";
        const limit = searchParams.get('limit') || 4;
        // console.log(searchParams);

        const skip = (page - 1) * limit;

        // Create the query to search across all fields of the Equipment collection
        const query = searchText
            ? {
                businessId: session.user.businessId,
                $or: [
                    { name: { $regex: searchText, $options: "i" } }, // case-insensitive search
                    { category: { $regex: searchText, $options: "i" } },
                    { serialNumber: { $regex: searchText, $options: "i" } },
                    { status: { $regex: searchText, $options: "i" } },
                ],
            }
            : { businessId: session.user.businessId }; // No searchText, fetch all

        // Count total documents matching the query
        const totalResults = await Equipment.countDocuments(query);
        const totalPages = Math.ceil(totalResults / limit);

        // Fetch equipment matching the query with pagination
        const equipments = await Equipment.find(query)
            .skip(skip)
            .limit(limit)
            .exec();
            // .sort({ createdAt: -1 }); // Sort by creation date (descending order)
        

        console.log('Equipments fetched successfully');
        return NextResponse.json({
            equipments,
            totalPages,
            totalResults,
        }, { status: 200 });
    } catch (error) {
        console.error('Error while fetching all equipments related to a business', error);
        return NextResponse.json({ err: error, message: 'Something is wrong on the server side' }, {
            status: 500,
        });
    }
}