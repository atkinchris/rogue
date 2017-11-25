import EnergyQueue from '../energyQueue'

describe('energyQueue', () => {
  it('adds an entity to the queue', () => {
    const queue = new EnergyQueue()

    queue.add('entity-1', { speed: 1 })

    expect(queue.toArray()).toEqual([
      'entity-1',
    ])
  })

  it('removes an entity from the queue', () => {
    const queue = new EnergyQueue()

    queue.add('entity-1', { speed: 1 })
    queue.add('entity-2', { speed: 1 })
    queue.add('entity-3', { speed: 1 })

    queue.remove('entity-2')

    expect(queue.toArray()).toEqual([
      'entity-1',
      'entity-3',
    ])
  })

  it('gets the next entity with enough energy', () => {
    const queue = new EnergyQueue()

    queue.add('entity-1', { speed: 5 })
    queue.add('entity-2', { speed: 10 })
    queue.add('entity-3', { speed: 5 })

    expect(queue.next()).toBe('entity-2')
    expect(queue.next()).toBe('entity-1')
    expect(queue.next()).toBe('entity-2')
    expect(queue.next()).toBe('entity-3')
    expect(queue.next()).toBe('entity-2')
    expect(queue.next()).toBe('entity-1')
    expect(queue.next()).toBe('entity-2')
    expect(queue.next()).toBe('entity-3')
  })
})
