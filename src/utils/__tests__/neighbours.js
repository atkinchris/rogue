import buildNeighbours from '../neighbours'

describe('neighbours', () => {
  const GRID = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ]
  const buildCallback = (grid = GRID) => jest.fn(({ x, y }) => grid[y] && grid[y][x])

  it('returns an array of neighbour cells', () => {
    const callback = buildCallback()
    const position = { x: 1, y: 1 }
    const neighbours = buildNeighbours(position, callback)

    expect(neighbours).toEqual([1, 0, 0, 1])
  })

  it('calls the callback to get the cells', () => {
    const callback = buildCallback()
    const position = { x: 2, y: 2 }
    buildNeighbours(position, callback)

    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith({ x: 2, y: 1 })
    expect(callback).toHaveBeenCalledWith({ x: 2, y: 3 })
    expect(callback).toHaveBeenCalledWith({ x: 1, y: 2 })
    expect(callback).toHaveBeenCalledWith({ x: 3, y: 2 })
  })
})
