import posToString from '../utils/posToString'

import buildReactRenderer from './react'

const buildRenderer = ({ store }) => {
  const render = buildReactRenderer()

  return () => {
    const vision = store.getCache('vision')
    const fogOfWar = store.getCache('fogOfWar')
    const entities = store
      .getEntitiesWith(['visible', 'position'])
      .map((id) => {
        const position = store.getComponent(id, 'position')
        const posString = posToString(position)
        const type = store.getComponent(id, 'type')
        let visibility

        if (vision[posString]) {
          visibility = 'visible'
        } else if (fogOfWar[posString] && store.hasComponent(id, 'visibleInFog')) {
          visibility = 'visibleInFog'
        } else {
          visibility = 'hidden'
        }

        return {
          id,
          type,
          position,
          visibility,
        }
      })

    render({ entities })
  }
}

export default buildRenderer
