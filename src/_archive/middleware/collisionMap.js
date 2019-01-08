import { posToString } from '../utils/positions'

const COLLIDES = 'collides'
const POSITION = 'position'

const onAdd = (store, component, entity, state) => {
  if (component !== COLLIDES && component !== POSITION) return
  const collisionMap = store.getCache('collisions') || {}

  if (component === COLLIDES && store.hasComponent(entity, POSITION)) {
    const currentPosition = store.getComponent(entity, POSITION)
    collisionMap[posToString(currentPosition)] = entity
  }

  if (component === POSITION && store.hasComponent(entity, COLLIDES)) {
    const { previous, next } = state

    if (previous) {
      delete collisionMap[posToString(previous)]
    }

    collisionMap[posToString(next)] = entity
  }

  store.setCache('collisions', collisionMap)
}

const onRemove = (store, component, entity) => {
  if (component !== COLLIDES && component !== POSITION) return
  const collisionMap = store.getCache('collisions') || {}

  if (
    (component === COLLIDES && store.hasComponent(entity, POSITION)) ||
    (component === POSITION && store.hasComponent(entity, COLLIDES))
  ) {
    const currentPosition = store.getComponent(entity, POSITION)
    delete collisionMap[posToString(currentPosition)]
  }

  store.setCache('collisions', collisionMap)
}

export default {
  onAdd,
  onRemove,
}
