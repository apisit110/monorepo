import cron from 'node-cron'

import 'libs/helpers/dotenv'
import { reportEndOfDay } from 'libs/utils/reports/internal/eod'
import { test } from 'libs/utils/test/test'

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
