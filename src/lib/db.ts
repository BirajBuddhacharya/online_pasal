import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

// Initialize the cached global variable if it doesn't exist yet
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  // Return the cached connection if available
  if (cached.conn) return cached.conn

  // Only set the promise if it doesn't exist
  if (!cached.promise) {
    // This line causes the error, we're going to cast it to the correct type
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }) as Promise<typeof mongoose>
  }

  // Resolve the connection and store it in the cache
  cached.conn = await cached.promise
  return cached.conn
}
