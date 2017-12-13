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
      grid[y2 - 1][x] = 'X'
      grid[y2][x] = '.'
      grid[y2 + 1][x] = 'X'
    }

    for (let y = y1; y < y2; y += 1) {
      grid[y][x2 - 1] = 'X'
      grid[y][x2] = '.'
      grid[y][x2 + 1] = 'X'
    }
  })

  rooms.forEach((room, index) => {
    const { x, y, width, height, midX, midY } = room

    for (let rY = 0; rY < height; rY += 1) {
      for (let rX = 0; rX < width; rX += 1) {
        if (!grid[y + rY]) {
          grid[y + rY] = [...Array(bounds.width)].fill(' ')
        }
        grid[y + rY][x + rX] = '.'
      }
    }

    for (let rX = 0; rX <= width; rX += 1) {
      grid[y][x + rX] = 'X'
      grid[y + height][x + rX] = 'X'
    }

    for (let rY = 0; rY <= height; rY += 1) {
      grid[y + rY][x] = 'X'
      grid[y + rY][x + width] = 'X'
    }

    grid[midY][midX] = String.fromCharCode(97 + index).toUpperCase()
  })

  return grid.map(row => row.join('')).join('\n')
}

export default buildGrid
