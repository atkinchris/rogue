import render from './render'
import playerControl from './playerControl'
import applyMovement from './applyMovement'
import evaluateMovement from './evaluateMovement'
import collision from './collision'
import cacheCollisions from './cacheCollisions'
import bumpAttack from './bumpAttack'
import attack from './attack'

export default [
  cacheCollisions(),
  playerControl(),
  evaluateMovement(),
  bumpAttack(),
  collision(),
  applyMovement(),
  attack(),
  render(),
]
