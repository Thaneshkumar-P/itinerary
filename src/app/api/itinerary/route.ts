import connectToMongoose from "@/lib/mongodb";
import { Itinerary } from "@/models/Itinerary";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import Mongoose for ValidationError type

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    await connectToMongoose();

    const itinerary = new Itinerary(data);
    await itinerary.save();

    return NextResponse.json({ itinerary }, { status: 201 });
  } catch (error) {
    console.error("Error saving itinerary:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessages = Object.values(error.errors).map(
        (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => err.message
      );

      return NextResponse.json(
        { error: "Validation error", fields: errorFields, messages: errorMessages },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create itinerary" }, { status: 500 });
  }
};
