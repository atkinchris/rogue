import applyAction from './applyAction'
import applyMovement from './applyMovement'
import applyVisibility from './applyVisibility'
import attack from './attack'
import bumpAttack from './bumpAttack'
import collision from './collision'
import damage from './damage'
import death from './death'
import evaluateMovement from './evaluateMovement'
import fieldOfVision from './fieldOfVision'

export default [
  applyAction(),
  evaluateMovement(),
  bumpAttack(),
  collision(),
  applyMovement(),
  attack(),
  damage(),
  death(),
  fieldOfVision(),
  applyVisibility(),
]
