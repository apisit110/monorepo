import { Request, Response, NextFunction } from 'express'
import { nanoid } from 'nanoid'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

import winston from 'libs/helpers/winston'

dayjs.extend(utc)
dayjs.extend(tz)

const createRequestLog =
  () => (req: Request, res: Response, next: NextFunction) => {
    res.locals.requestUID = nanoid()
    res.locals.requestTime = dayjs().utc()

    winston.info(
      'request ' +
        `${res.locals.requestUID} ` +
        `${req.method} ` +
        `${req.originalUrl} ` +
        `${req.ip} ` +
        `${req.headers['user-agent']} ` +
        {
          requestUID: res.locals.requestUID,
          type: 'request',
          method: req.method,
          url: req.originalUrl,
          request: {
            headers: req.headers,
            body: req.body
          }
        }
    )
    next()
  }

const createResponseLog =
  () => (req: Request, res: Response, next: NextFunction) => {
    const requestUID: string = res.locals.requestUID
    const requestTime: Dayjs = res.locals.requestTime
    const body: any = res.locals.body

    const responseTime = dayjs().diff(requestTime, 'milliseconds')

    winston.info(
      'response ' +
        `${requestUID} ` +
        `${req.method} ` +
        `${req.originalUrl} ` +
        `${res.statusCode} ` +
        `${responseTime} ` +
        {
          requestUID,
          type: 'response',
          method: req.method,
          url: req.originalUrl,
          response: {
            status: res.statusCode,
            time: responseTime,
            timeUnit: 'ms',
            headers: res.getHeaders(),
            body
          }
        }
    )
    next()
  }

export default {
  createRequestLog,
  createResponseLog
}
