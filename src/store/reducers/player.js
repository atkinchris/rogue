const PLAYER = {
  x: 1,
  y: 1,
  type: '@',
}

const playerReducer = (state = PLAYER, action) => {
  if (action && action.type === 'move') {
    const { x, y } = action.payload
    return { ...state, x, y }
  }

  return state
}

export default playerReducer
