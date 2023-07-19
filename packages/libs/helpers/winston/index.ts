import path from 'path'
import winston from 'winston'
import 'winston-daily-rotate-file'

const winstonHelper = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf((info) => `${info.level} ${info.timestamp} ${info.message} `)
      )
    }),

    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),

    new winston.transports.DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', '%DATE%.json'),
      datePattern: 'YYYY-MM-DD'
      // zippedArchive: true,
      // maxSize: '20m',
      // maxFiles: '14d'
    })
  ]
})

export default winstonHelper
