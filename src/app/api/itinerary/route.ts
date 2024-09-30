import connectToMongoose from "@/lib/mongodb";
import { Itinerary } from "@/models/Itinerary";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    await connectToMongoose()

    const res = new Itinerary(data)

    res.save()

    console.log(res)

    return NextResponse.json({ res }, { status: 201 })
  } catch (error) {
    console.log(error)
  }
}