import Queue from '../queue'

describe('queue', () => {
  it('creates a new turn queue', () => {
    const queue = new Queue()

    expect(queue).toBeInstanceOf(Queue)
  })

  it('adds an item to the queue', () => {
    const queue = new Queue()

    queue.enqueue('entity-1')

    expect(queue.toArray()).toEqual([
      'entity-1',
    ])
  })

  it('removes an item from the queue', () => {
    const queue = new Queue()

    queue.enqueue('entity-1')
    queue.enqueue('entity-2')
    queue.enqueue('entity-3')
    queue.dequeue('entity-2')

    expect(queue.toArray()).toEqual([
      'entity-1',
      'entity-3',
    ])
  })

  it('returns "true" if an item is in the queue', () => {
    const queue = new Queue()

    queue.enqueue('entity-1')
    queue.enqueue('entity-2')
    queue.enqueue('entity-3')

    expect(queue.isQueued('entity-2')).toBe(true)
    expect(queue.isQueued('entity-4')).toBe(false)
  })

  it('returns "false" if an item is not in the queue', () => {
    const queue = new Queue()

    queue.enqueue('entity-1')
    queue.enqueue('entity-2')
    queue.enqueue('entity-3')

    expect(queue.isQueued('entity-4')).toBe(false)
  })

  it('gets the next item from the queue', () => {
    const queue = new Queue()

    queue.enqueue('entity-1')
    queue.enqueue('entity-2')
    queue.enqueue('entity-3')

    expect(queue.next()).toBe('entity-1')
    expect(queue.next()).toBe('entity-2')
    expect(queue.next()).toBe('entity-3')
    expect(queue.next()).toBe('entity-1')
  })
})
