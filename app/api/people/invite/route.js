import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import nodemailer from 'nodemailer';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You must have valid session token to access this API route." }, {
            status: 401,
        });
    }

    const { email } = await req.json();

    const payload = {
        email,
        role: 'guide',
        businessId: session.user?.businessId,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_EMAIL_INVITATION, { expiresIn: '1d' });
    const link = `https://yourdomain.com/invite?token=${token}`;

    try {
        const accessToken = await oAuth2Client.getAccessToken();


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token || accessToken,
            },
        });

        const mailOptions = {
            from: `HikingVault - ${process.env.GMAIL_USER}`,
            to: email,
            subject: 'You have been invited to join HikingVault as a Guide',
            html: `<p>You have been invited to join. Click the link below to accept the invitation:</p>
               <a href="${link}">Accept Invitation</a>`,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);

        return NextResponse.json({ message: `Invitation sent to ${email}` }, {
            status: 201,
        }); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Something is wrong. Try again later` }, {
            status: 500,
        });
    }

    
} 