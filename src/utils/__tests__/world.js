import World from '../world'

describe('World', () => {
  let world

  beforeEach(() => {
    world = new World()

    world.addZone(0, 0)
    world.addZone(1, 0)
    world.addZone(2, 0)
    world.addZone(0, 1)
    world.addZone(1, 1)
    world.addZone(2, 1)
  })

  it('gets a cell from a position', () => {
    const position = world.getPosition(16, 3)

    expect(position).toEqual({
      blocked: false,
      region: '00010000:1',
      x: 2,
      y: 3,
    })
  })
})
