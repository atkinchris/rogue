import { v4 as uuid } from 'uuid'

import { EnergyQueue } from './Queue'

const DEFAULT_MIDDLEWARE = { onAdd: [], onRemove: [] }

class Store {
  constructor({ debug, middleware = DEFAULT_MIDDLEWARE } = {}) {
    this.entities = new Map()
    this.entitiesDynamic = new Map()
    this.entitiesStatic = new Map()
    this.components = {}
    this.caches = {}
    this.turnQueue = new EnergyQueue()
    this.debug = debug
    this.middleware = {
      onAdd: [...middleware.onAdd],
      onRemove: [...middleware.onRemove],
    }
  }

  cacheEntities() {
    const staticFilter = bool => ([, { isStatic }]) => isStatic === bool
    this.entitiesDynamic = new Map([...this.entities].filter(staticFilter(false)))
    this.entitiesStatic = new Map([...this.entities].filter(staticFilter(true)))
  }

  createEntity(isStatic = false) {
    const id = uuid()
    this.entities.set(id, { isStatic })

    this.cacheEntities()

    return id
  }

  removeEntity(entity) {
    this.entities.delete(entity)

    this.cacheEntities()

    Object.keys(this.components).forEach(component => this.removeComponent(entity, component))
  }

  setCache(key, cache) {
    this.caches[key] = cache
  }

  getCache(key) {
    return this.caches[key]
  }

  addComponent(entity, componentName, state = true) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities.get(entity)

    if (!existingComponents) {
      throw Error(`Attempted to add component to entity that does not exist (${entity})`)
    }

    const previous = component.get(entity)
    const next = state

    this.middleware.onAdd.forEach(m => m(this, componentName, entity, { previous, next }))
    component.set(entity, next)
    existingComponents[componentName] = true

    this.components[componentName] = component
  }

  removeComponent(entity, componentName) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities.get(entity)

    this.middleware.onRemove.forEach(m => m(this, componentName, entity))
    component.delete(entity)
    delete existingComponents[componentName]

    this.components[componentName] = component
  }

  getEntitiesWith(componentNames, includeStatic = false) {
    const entities = includeStatic ? this.entities : this.entitiesDynamic
    return [...entities].reduce((out, [entity, components]) => {
      if (componentNames.every(name => components[name])) {
        out.push(entity)
      }
      return out
    }, [])
  }

  getComponent(entity, component) {
    return this.components[component] && this.components[component].get(entity)
  }

  hasComponent(entity, component) {
    return !!this.getComponent(entity, component)
  }

  debugComponents() {
    // eslint-disable-next-line no-console
    console.log(this.components)
  }
}

export default Store
