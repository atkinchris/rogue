import calculatePath from '../pathFinding'

describe('calculatePath', () => {
  const buildCallback = grid => jest.fn(({ x, y }) => ({
    x,
    y,
    cost: 1,
    blocked: grid[y] && grid[y][x],
  }))

  it('calculates a path', () => {
    const start = { x: 1, y: 3 }
    const end = { x: 3, y: 1 }
    const grid = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ]
    const callback = buildCallback(grid)

    const path = calculatePath(start, end, callback)

    expect(path).toEqual([
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 3, y: 2 },
      { x: 3, y: 1 },
    ])
  })

  it('returns an empty path if not traversable', () => {
    const start = { x: 1, y: 3 }
    const end = { x: 3, y: 1 }
    const grid = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ]
    const callback = buildCallback(grid)

    const path = calculatePath(start, end, callback)

    expect(path).toEqual([])
  })
})
