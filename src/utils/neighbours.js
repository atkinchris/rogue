const buildNeighbours = ({ x, y }, callback) => {
  const neighbours = {
    left: callback({ x: x - 1, y }),
    right: callback({ x: x + 1, y }),
    down: callback({ x, y: y - 1 }),
    up: callback({ x, y: y + 1 }),
  }

  return Object.values(neighbours)
}

export default buildNeighbours
