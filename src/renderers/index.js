import renderer from './react'
import tiles from './tiles'

const buildRenderer = ({ store }) => {
  const render = renderer()

  return () => {
    const bounds = {
      width: 0,
      height: 0,
    }
    const entities = store
      .getEntitiesWith(['visibility', 'position', 'type'], true)
      .map((entity) => {
        const position = store.getComponent(entity, 'position')
        const visibility = store.getComponent(entity, 'visibility')
        const type = store.getComponent(entity, 'type')

        if (position.x > bounds.width) {
          bounds.width = position.x
        }

        if (position.y > bounds.height) {
          bounds.height = position.y
        }

        return {
          id: entity,
          type,
          tile: tiles[type],
          position,
          visibility,
        }
      })

    render({ entities, bounds })
  }
}

export default buildRenderer
