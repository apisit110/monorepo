import { test1Queue } from 'libs/helpers/queue'

import testQueueService from './service'

const workerQueue = () => {
  test1Queue.process('__default__', 5, testQueueService)

  test1Queue.on('error', function (error) {
    // An error occured.
    console.log(error)
  })

  test1Queue.on('waiting', function (jobId) {
    // A Job is waiting to be processed as soon as a worker is idling.
    console.log('test 1 queue waiting')
  })

  test1Queue.on('active', function (job, jobPromise) {
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
    console.log('test 1 queue active')
  })

  test1Queue.on('stalled', function (job) {
    // A job has been marked as stalled. This is useful for debugging job
    // workers that crash or pause the event loop.
  })

  test1Queue.on('lock-extension-failed', function (job, err) {
    // A job failed to extend lock. This will be useful to debug redis
    // connection issues and jobs getting restarted because workers
    // are not able to extend locks.
  })

  test1Queue.on('progress', function (job, progress) {
    // A job's progress was updated!
    console.log('test 1 queue progress')
  })

  test1Queue.on('completed', function (job, result) {
    // A job successfully completed with a `result`.
    console.log('test 1 queue completed')
  })

  test1Queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log('test 1 queue failed')
  })

  test1Queue.on('paused', function () {
    // The queue has been paused.
    console.log('test 1 queue paused')
  })

  test1Queue.on('resumed', function (job: any) {
    // The queue has been resumed.
    console.log('test 1 queue resumed')
    console.log(job)
  })

  test1Queue.on('cleaned', function (jobs, type) {
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
    console.log('test 1 queue cleaned')
  })

  test1Queue.on('drained', function () {
    // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
    console.log('test 1 queue drained')
  })

  test1Queue.on('removed', function (job) {
    // A job successfully removed.
    console.log('test 1 queue removed')
  })
}

export { workerQueue }
