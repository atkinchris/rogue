class Queue {
  constructor() {
    this.queue = []
  }

  enqueue(item) {
    if (!this.isQueued(item)) {
      this.queue.push(item)
    }
  }

  dequeue(item) {
    const index = this.queue.indexOf(item)

    if (index !== -1) {
      this.queue.splice(index, 1)
    }
  }

  isQueued(item) {
    return this.queue.indexOf(item) !== -1
  }

  toArray() {
    return this.queue
  }

  next() {
    const item = this.queue.shift()
    this.enqueue(item)
    return item
  }
}

export default Queue
