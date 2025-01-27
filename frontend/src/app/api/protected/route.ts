import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.get("https://localhost:7214/api/protected/user-data", {
      headers: {
        Authorization: `Bearer ${session.user.token}`
      }
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Protected API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch protected data" },
      { status: error.response?.status || 500 }
    );
  }
} 