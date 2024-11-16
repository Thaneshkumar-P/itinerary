import mongoose, { Connection } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

interface MongooseGlobal extends Global {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const globalWithMongoose = global as unknown as MongooseGlobal;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectToMongoose(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      dbName: "yaadigo",
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => mongoose.connection)
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        throw new Error("Database connection failed");
      });
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");
  return cached.conn;
}

export default connectToMongoose;
