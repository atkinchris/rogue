import { posToString } from '../utils/positions'

const collision = () => store => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides'])
  const collisionMap = store.getCache('collisions')

  entities.forEach(entity => {
    const destination = store.getComponent(entity, 'moveIntent')

    if (collisionMap[posToString(destination)]) {
      store.removeComponent(entity, 'moveIntent')
    }
  })
}

export default collision
