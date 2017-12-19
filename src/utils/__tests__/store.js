import Store from '../store'

describe('store', () => {
  it('adds a component to an entity', () => {
    const store = new Store()
    const entity = store.createEntity()

    store.addComponent(entity, 'hasCake', true)

    expect(store.getEntitiesWith(['hasCake'])).toEqual([
      entity,
    ])
  })

  it('removes a component from an entity', () => {
    const store = new Store()
    const entity = store.createEntity()

    store.addComponent(entity, 'hasCake', true)
    store.removeComponent(entity, 'hasCake')

    expect(store.getEntitiesWith(['hasCake'])).toEqual([])
  })

  it('throws an error if trying to add a component to an entity that does not exist', () => {
    const store = new Store()

    const test = () => store.addComponent('unknown-entity', 'hasCake', true)

    expect(test).toThrowError('Attempted to add component to entity that does not exist (unknown-entity)')
  })
})
