import playerControl from './playerControl'
import applyMovement from './applyMovement'
import evaluateMovement from './evaluateMovement'
import collision from './collision'
import cacheCollisions from './cacheCollisions'
import bumpAttack from './bumpAttack'
import attack from './attack'
import damage from './damage'
import death from './death'

// import renderCanvas from './render'
import renderReact from './renderReact'

export default [
  cacheCollisions(),
  playerControl(),
  evaluateMovement(),
  bumpAttack(),
  collision(),
  applyMovement(),
  attack(),
  damage(),
  death(),
  // renderCanvas(),
  renderReact(),
]
