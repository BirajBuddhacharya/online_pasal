import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/models/User'

export default async function GET() {
  await connectToDatabase()
  const users = await User.find()
  return NextResponse.json(users)
}
