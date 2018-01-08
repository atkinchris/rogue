import invert from './utils/invert'
import { arrayToHash } from './utils/bitmask'

const components = arrayToHash([
  'attackIntent',
  'blocksSight',
  'canAttack',
  'collides',
  'cpuControlled',
  'hasEnergy',
  'hasTurn',
  'health',
  'moveIntent',
  'playerControlled',
  'position',
  'receiveDamage',
  'isStatic',
  'type',
  'visibility',
  'visible',
  'visibleInFog',
])

export default invert(components)
