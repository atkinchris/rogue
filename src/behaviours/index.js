import relativeDirection from '../utils/relativeDirection'
import posToString from '../utils/posToString'
import calculatePath from '../utils/pathFinding'

const behaviourEngine = ({ player }) => (entity, store) => {
  const visibility = store.getComponent(entity, 'visibility')

  if (visibility === 'visible') {
    const entityPosition = store.getComponent(entity, 'position')
    const playerPosition = store.getComponent(player, 'position')
    const collisionMap = store.getCache('collisions')
    const callback = pos => ({
      ...pos,
      cost: 1,
      blocked: (
        !(pos.x === playerPosition.x && pos.y === playerPosition.y) &&
        collisionMap[posToString(pos)]
      ),
    })
    const path = calculatePath(entityPosition, playerPosition, callback)

    if (path.length > 0) {
      const direction = relativeDirection(entityPosition, path[0])

      return {
        type: 'move',
        direction,
        entity,
      }
    }
  }

  return null
}

export default behaviourEngine
