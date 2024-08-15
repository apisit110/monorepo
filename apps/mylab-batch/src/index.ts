import * as cron from 'node-cron'

import '@lab/libs/helpers/dotenv'
import { reportEndOfDay } from '@lab/libs/utils/reports/internal/eod'
import { test } from '@lab/libs/utils/test/test'

const TIMEZONE = process.env.TZ as string

cron.schedule(
  '*/5 * * * * *',
  async () => {
    console.log('You will see this message every 5 second')
    await test()
  },
  {
    scheduled: true,
    timezone: TIMEZONE
  }
)

cron.schedule(
  '0 30 0 * * *',
  async () => {
    console.log('You will see this message every 00:30 AM')
    await reportEndOfDay()
  },
  {
    scheduled: true,
    timezone: TIMEZONE
  }
)
