import posToString from '../utils/posToString'

const applyVision = () => (store) => {
  const vision = store.getCache('vision')
  const fogOfWar = store.getCache('fogOfWar')

  store.getEntitiesWith(['visible', 'position']).forEach((entity) => {
    const position = store.getComponent(entity, 'position')
    const posString = posToString(position)

    if (vision[posString]) {
      store.addComponent(entity, 'visibility', 'visible')
    } else if (fogOfWar[posString] && store.hasComponent(entity, 'visibleInFog')) {
      store.addComponent(entity, 'visibility', 'fogged')
    } else {
      store.addComponent(entity, 'visibility', 'hidden')
    }
  })
}

export default applyVision
