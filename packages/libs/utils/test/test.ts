import { test1Queue, test2Queue } from 'libs/helpers/queue/index'

export const test = async () => {
  const test1QueueData = {}
  test1Queue.add(test1QueueData)

  const test2QueueData = {}
  test2Queue.add(test2QueueData)
}
