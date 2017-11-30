import buildReactRenderer from './react'

const buildRenderer = ({ store }) => {
  const render = buildReactRenderer()

  return () => {
    const bounds = {
      width: 0,
      height: 0,
    }
    const entities = store
      .getEntitiesWith(['visibility', 'position', 'type'])
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
          position,
          visibility,
        }
      })

    render({ entities, bounds })
  }
}

export default buildRenderer
