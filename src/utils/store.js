import { v4 as uuid } from 'uuid'

import Queue from './queue'

class Store {
  constructor() {
    this.entities = {}
    this.components = {}
    this.caches = {}
    this.energyQueue = new Queue()
  }

  createEntity() {
    const id = uuid()
    this.entities[id] = true

    return id
  }

  removeEntity(entity) {
    this.entities[entity] = null

    Object.keys(this.components).forEach(component => this.removeComponent(entity, component))
  }

  setCache(key, cache) {
    this.caches[key] = cache
  }

  getCache(key) {
    return this.caches[key]
  }

  addComponent(entity, component, state = true) {
    if (!this.components[component]) {
      this.components[component] = {}
    }

    this.components[component][entity] = state
  }

  removeComponent(entity, component) {
    if (!this.components[component]) {
      this.components[component] = {}
    }

    this.components[component][entity] = null
  }

  getEntitiesWith(components) {
    const allEntities = Object.keys(this.entities)

    return allEntities.filter(entity => (
      components.every(component => this.getComponent(entity, component))
    ))
  }

  getComponent(entity, component) {
    return this.components[component] && this.components[component][entity]
  }

  debugComponents() {
    // eslint-disable-next-line no-console
    console.log(this.components)
  }
}

export default Store
