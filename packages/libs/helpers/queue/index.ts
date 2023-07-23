import Queue, { QueueOptions } from 'bull'

import queueNameMaster from 'libs/constants/masters/queueNameMaster.json'

const REDIS_HOST = process.env.REDIS_HOST as string
const REDIS_PORT = Number(process.env.REDIS_PORT)

const option: QueueOptions = {
  prefix: 'MYLAB',
  redis: { port: REDIS_PORT, host: REDIS_HOST }
}

export const test1Queue = new Queue(queueNameMaster.TEST_1_QUEUE, option)
export const test2Queue = new Queue(queueNameMaster.TEST_2_QUEUE, option)
