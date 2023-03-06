import { Request, Response, NextFunction } from 'express'

const about = () => (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: '0000', message: 'about' })
  next()
}

export default {
  about
}
