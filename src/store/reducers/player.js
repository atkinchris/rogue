const PLAYER = {
  x: 1,
  y: 1,
  type: '@',
}

const playerReducer = (state = PLAYER, action) => {
  if (action && action.type === 'input') {
    let { x, y } = state
    const { type } = state

    switch (action.payload) {
      case 'up':
        y -= 1
        break
      case 'down':
        y += 1
        break
      case 'left':
        x -= 1
        break
      case 'right':
        x += 1
        break
      default:
        break
    }

    return {
      x,
      y,
      type,
    }
  }

  return state
}

export default playerReducer
