import applyMovement from './applyMovement'
import attack from './attack'
import bumpAttack from './bumpAttack'
import bumpOpenDoors from './bumpOpenDoors'
import cacheCollisions from './cacheCollisions'
import collision from './collision'
import cpuTurn from './cpuTurn'
import damage from './damage'
import death from './death'
import debug from './debug'
import energy from './energy'
import evaluateMovement from './evaluateMovement'
import playerControl from './playerControl'

// import renderCanvas from './render'
import renderReact from './renderReact'

export default [
  debug(),
  cacheCollisions(),
  energy(),
  cpuTurn(),
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
