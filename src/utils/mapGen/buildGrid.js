const WALL = '#'
const FLOOR = '.'

const buildGrid = ({ rooms, bounds, corridors }) => {
  const grid = []

  for (let y = 0; y <= bounds.height; y += 1) {
    grid[y] = [...Array(bounds.width)].fill(' ')
  }

  corridors.forEach((corridor) => {
    const [[aX, aY], [bX, bY]] = corridor

    const x1 = Math.min(aX, bX)
    const x2 = Math.max(aX, bX)

    const y1 = Math.min(aY, bY)
    const y2 = Math.max(aY, bY)

    for (let x = x1; x < x2; x += 1) {
      grid[y2 - 1][x] = WALL
      grid[y2][x] = FLOOR
      grid[y2 + 1][x] = WALL
    }

    for (let y = y1; y < y2; y += 1) {
      grid[y][x2 - 1] = WALL
      grid[y][x2] = FLOOR
      grid[y][x2 + 1] = WALL
    }
  })

  rooms.forEach((room, index) => {
    const { x, y, width, height, midX, midY } = room

    for (let rY = 0; rY < height; rY += 1) {
      for (let rX = 0; rX < width; rX += 1) {
        if (!grid[y + rY]) {
          grid[y + rY] = [...Array(bounds.width)].fill(' ')
        }
        grid[y + rY][x + rX] = FLOOR
      }
    }

    for (let rX = 0; rX <= width; rX += 1) {
      grid[y][x + rX] = WALL
      grid[y + height][x + rX] = WALL
    }

    for (let rY = 0; rY <= height; rY += 1) {
      grid[y + rY][x] = WALL
      grid[y + rY][x + width] = WALL
    }

    grid[midY][midX] = 'k'
  })

  const player = {
    x: rooms[0].midX,
    y: rooms[0].midY,
  }

  grid[player.y][player.x] = '@'

  return grid.map(row => row.join(''))
}

export default buildGrid
