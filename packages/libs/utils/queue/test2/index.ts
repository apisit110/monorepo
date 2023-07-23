import { test2Queue } from 'libs/helpers/queue'

import test2QueueService from './service'

const workerQueue = () => {
  test2Queue.process('__default__', 5, test2QueueService)

  test2Queue.on('error', function (error) {
    // An error occured.
    console.log(error)
  })

  test2Queue.on('waiting', function (jobId) {
    // A Job is waiting to be processed as soon as a worker is idling.
    console.log('test 2 queue waiting')
  })

  test2Queue.on('active', function (job, jobPromise) {
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
    console.log('test 2 queue active')
  })

  test2Queue.on('stalled', function (job) {
    // A job has been marked as stalled. This is useful for debugging job
    // workers that crash or pause the event loop.
  })

  test2Queue.on('lock-extension-failed', function (job, err) {
    // A job failed to extend lock. This will be useful to debug redis
    // connection issues and jobs getting restarted because workers
    // are not able to extend locks.
  })

  test2Queue.on('progress', function (job, progress) {
    // A job's progress was updated!
    console.log('test 2 queue progress')
  })

  test2Queue.on('completed', function (job, result) {
    // A job successfully completed with a `result`.
    console.log('test 2 queue completed')
  })

  test2Queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log('test 2 queue failed')
  })

  test2Queue.on('paused', function () {
    // The queue has been paused.
    console.log('test 2 queue paused')
  })

  test2Queue.on('resumed', function (job: any) {
    // The queue has been resumed.
    console.log('test 2 queue resumed')
    console.log(job)
  })

  test2Queue.on('cleaned', function (jobs, type) {
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
    console.log('test 2 queue cleaned')
  })

  test2Queue.on('drained', function () {
    // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
    console.log('test 2 queue drained')
  })

  test2Queue.on('removed', function (job) {
    // A job successfully removed.
    console.log('test 2 queue removed')
  })
}

export { workerQueue }
