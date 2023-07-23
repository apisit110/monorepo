import { Redis } from 'ioredis'

const REDIS_HOST = process.env.REDIS_HOST as string
const REDIS_PORT = Number(process.env.REDIS_PORT)

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST
})

redis.on('ready', () => { console.log('Redis client ready') })
redis.on('error', (error: Error) => console.log(`Redis client rrror with ${REDIS_HOST}:${REDIS_PORT}`, error))
