import { v4 as uuid } from 'uuid'

import { EnergyQueue } from './Queue'

class Store {
  constructor({ debug, middleware = {} } = {}) {
    this.entities = new Map()
    this.components = {}
    this.caches = {}
    this.turnQueue = new EnergyQueue()
    this.debug = debug
    this.middleware = {
      onAdd: [...middleware.onAdd],
      onRemove: [...middleware.onRemove],
    }
  }

  createEntity() {
    const id = uuid()
    this.entities.set(id, {})

    return id
  }

  removeEntity(entity) {
    this.entities.delete(entity)

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

    const previous = component.get(entity)
    const next = state

    this.middleware.onAdd.forEach(m => m(this, componentName, entity, { previous, next }))
    component.set(entity, next)
    this.entities.set(entity, { ...existingComponents, [componentName]: true })

    this.components[componentName] = component
  }

  removeComponent(entity, componentName) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities.get(entity)

    this.middleware.onRemove.forEach(m => m(this, componentName, entity))
    component.delete(entity)
    this.entities.set(entity, { ...existingComponents, [componentName]: null })

    this.components[componentName] = component
  }

  getEntitiesWith(componentNames, includeStatic = false) {
    return [...this.entities]
      .filter(([, components]) => !components.static || includeStatic)
      .reduce((out, [entity, components]) => {
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
