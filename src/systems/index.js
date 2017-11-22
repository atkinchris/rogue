import playerControl from './playerControl'
import applyMovement from './applyMovement'
import evaluateMovement from './evaluateMovement'
import collision from './collision'
import cacheCollisions from './cacheCollisions'
import bumpAttack from './bumpAttack'
import bumpOpenDoors from './bumpOpenDoors'
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
  bumpOpenDoors(),
  collision(),
  applyMovement(),
  attack(),
  damage(),
  death(),
  // renderCanvas(),
  renderReact(),
]
