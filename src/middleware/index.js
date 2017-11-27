import turnQueue from './turnQueue'

export default {
  onAdd: [
    turnQueue.onAdd,
  ],
  onRemove: [
    turnQueue.onRemove,
  ],
}
