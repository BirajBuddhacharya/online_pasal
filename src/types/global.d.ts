// src/types/global.d.ts
import type { Mongoose } from 'mongoose'

/* eslint-disable no-var */
declare global {
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}
/* eslint-enable no-var */

export {}
