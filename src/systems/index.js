import applyAction from './applyAction'
import applyMovement from './applyMovement'
import applyVisibility from './applyVisibility'
import attack from './attack'
import bumpAttack from './bumpAttack'
import collision from './collision'
import damage from './damage'
import death from './death'
import evaluateMovement from './evaluateMovement'
import expandFog from './expandFog'
import fieldOfVision from './fieldOfVision'

export default (...args) => [
  applyAction(...args),
  evaluateMovement(...args),
  bumpAttack(...args),
  collision(...args),
  applyMovement(...args),
  attack(...args),
  damage(...args),
  death(...args),
  fieldOfVision(...args),
  expandFog(...args),
  applyVisibility(...args),
]
