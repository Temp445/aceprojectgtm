// app/api/proxy-validate-email/route.ts 
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const API_KEY = process.env.EMAIL_VALIDATOR_SECRET!;
    const VALIDATOR_URL = process.env.EMAIL_VALIDATOR_URL!;

    if (!API_KEY || !VALIDATOR_URL) {
      return new NextResponse(
        JSON.stringify({ message: "Missing env variables" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(VALIDATOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.text(); // or response.json() if you expect JSON
      throw new Error(`Validation API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Validation proxy error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error calling validation API" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
