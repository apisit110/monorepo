import { Request, Response, NextFunction } from 'express'

const test1 = () => (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: '0000', message: 'test1' })
  next()
}

const test2 = () => (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: '0000', message: 'test2' })
  next()
}

export default {
  test1,
  test2
}
