import * as queues from './queues'

const quotesName = Object.keys(queues)

const workerQueue = () => {
  quotesName.forEach((val) => {
    queues[val as keyof typeof queues].workerQueue()
  })
}

export { workerQueue }
