const board = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '@', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
]

const entities = board.reduce((out, row, y) => ({
  ...out,
  ...row.reduce((rowOut, cell, x) => ({
    ...rowOut,
    [`${x},${y}`]: cell,
  }), {}),
}), {})

const boardReducer = (state = entities, action) => {
  if (action && action.type === 'input') {
    const playerPosition = Object.keys(state).find(key => state[key] === '@')
    const [xStr, yStr] = playerPosition.split(',')
    let x = parseInt(xStr, 10)
    let y = parseInt(yStr, 10)

    switch (action.payload) {
      case 'KeyW':
      case 'ArrowUp':
        y -= 1
        break
      case 'KeyS':
      case 'ArrowDown':
        y += 1
        break
      case 'KeyA':
      case 'ArrowLeft':
        x -= 1
        break
      case 'KeyD':
      case 'ArrowRight':
        x += 1
        break
      default:
        break
    }

    const newPosition = `${x},${y}`

    if (state[newPosition] !== ' ') {
      return state
    }

    return {
      ...state,
      [playerPosition]: ' ',
      [newPosition]: '@',
    }
  }

  return state
}

export default boardReducer
