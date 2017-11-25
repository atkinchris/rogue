import applyMovement from './applyMovement'
import attack from './attack'
import bumpAttack from './bumpAttack'
import bumpOpenDoors from './bumpOpenDoors'
import cacheCollisions from './cacheCollisions'
import collision from './collision'
import damage from './damage'
import death from './death'
import debug from './debug'
import evaluateMovement from './evaluateMovement'
import applyAction from './applyAction'

// import renderCanvas from './render'
import renderReact from './renderReact'

export default [
  debug(),
  cacheCollisions(),
  applyAction(),
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
