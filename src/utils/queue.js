class Queue {
  constructor() {
    this.queue = []
  }

  list() {
    return this.queue
  }

  enqueue(item) {
    if (!this.isQueued(item)) {
      this.queue.push(item)
    }
  }

  dequeue() {
    return this.queue.shift()
  }

  isQueued(item) {
    return this.queue.indexOf(item) !== -1
  }

  remove(item) {
    const index = this.queue.indexOf(item)

    if (index !== -1) {
      this.queue.splice(index, 1)
    }
  }

  next() {
    const item = this.dequeue()
    this.enqueue(item)
    return item
  }
}

export default Queue
