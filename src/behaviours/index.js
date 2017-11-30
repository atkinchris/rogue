import relativeDirection from '../utils/relativeDirection'

const behaviourEngine = ({ player }) => (entity, store) => {
  const visibility = store.getComponent(entity, 'visibility')

  if (visibility === 'visible') {
    const entityPosition = store.getComponent(entity, 'position')
    const playerPosition = store.getComponent(player, 'position')
    const direction = relativeDirection(entityPosition, playerPosition)

    return {
      type: 'move',
      direction,
      entity,
    }
  }
}

export default behaviourEngine
