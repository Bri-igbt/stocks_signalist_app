import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    global.mongooseCache = { conn: null, promise: null };
    cached = global.mongooseCache;
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error("MONGODB_URI must be set within .env file");

    if (cached!.conn) return cached!.conn;

    if (!cached!.promise) {
        cached!.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false
        });
    }

    try {
        cached!.conn = await cached!.promise!;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`);
    return cached!.conn;
};
