import { selectPlayer } from '../selectors'

const movementMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (action && action.type === 'input') {
    const player = selectPlayer(getState())
    let { x, y } = player

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

    return dispatch({ type: 'move', payload: { x, y } })
  }

  return next(action)
}

export default movementMiddleware
