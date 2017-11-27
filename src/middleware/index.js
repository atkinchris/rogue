import turnQueue from './turnQueue'
import collisionMap from './collisionMap'

export default {
  onAdd: [
    turnQueue.onAdd,
    collisionMap.onAdd,
  ],
  onRemove: [
    turnQueue.onRemove,
    collisionMap.onRemove,
  ],
}
