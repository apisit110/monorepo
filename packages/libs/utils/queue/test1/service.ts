import { Job, DoneCallback } from 'bull'

export default (job: Job, done: DoneCallback) => {
  try {
    console.log('Start process test queue 1')

    return done()
  } catch (error: any) {
    return done(error)
  }
}
