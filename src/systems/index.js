import renderSystem from './render'
import playerControlSystem from './playerControl'
import applyMovementSystem from './applyMovement'
import evaluateMovementSystem from './evaluateMovement'
import collisionSystem from './collision'
import cacheCollisionsSystem from './cacheCollisions'

export default [
  cacheCollisionsSystem(),
  playerControlSystem(),
  evaluateMovementSystem(),
  collisionSystem(),
  applyMovementSystem(),
  renderSystem(),
]
