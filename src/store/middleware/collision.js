import { selectEntitiesByCoord } from '../selectors'

const collisionMiddleware = ({ getState }) => next => (action) => {
  if (action && action.type === 'move') {
    const entities = selectEntitiesByCoord(getState())
    const { x, y } = action.payload

    if (entities[x] && entities[x][y] && entities[x][y].type !== '.') {
      return null
    }
  }

  return next(action)
}

export default collisionMiddleware
