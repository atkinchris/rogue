import { v4 as uuid } from 'uuid'

import { EnergyQueue } from './Queue'
import { arrayToMask, addFlag, removeFlag, hasFlags } from '../utils/bitmask'
import componentFlags from '../components'

const DEFAULT_MIDDLEWARE = { onAdd: [], onRemove: [] }

class Store {
  constructor({ debug, middleware = DEFAULT_MIDDLEWARE } = {}) {
    this.entities = {}
    this.masks = {}
    this.components = {}
    this.caches = {}
    this.turnQueue = new EnergyQueue()
    this.debug = debug
    this.middleware = {
      onAdd: [...middleware.onAdd],
      onRemove: [...middleware.onRemove],
    }
  }

  updateMask(entity, oldComponents, newComponents) {
    if (oldComponents === newComponents) {
      return
    }

    if (!this.masks[oldComponents]) {
      this.masks[oldComponents] = {}
    }

    if (!this.masks[newComponents]) {
      this.masks[newComponents] = {}
    }

    delete this.masks[oldComponents][entity]
    this.masks[newComponents][entity] = true
    this.entities[entity] = newComponents
  }

  createEntity() {
    const entity = uuid()

    this.entities[entity] = 0

    return entity
  }

  removeEntity(entity) {
    Object.keys(this.components).forEach(component => this.removeComponent(entity, component))

    delete this.entities[entity]
  }

  setCache(key, cache) {
    this.caches[key] = cache
  }

  getCache(key) {
    return this.caches[key]
  }

  addComponent(entity, componentName, state = true) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities[entity]

    if (existingComponents === undefined) {
      throw Error(`Attempted to add component to entity that does not exist (${entity})`)
    }

    const previous = component.get(entity)
    const next = state

    this.middleware.onAdd.forEach(m => m(this, componentName, entity, { previous, next }))
    component.set(entity, next)

    const newComponents = addFlag(existingComponents, componentFlags[componentName])
    this.updateMask(entity, existingComponents, newComponents)

    this.components[componentName] = component
  }

  removeComponent(entity, componentName) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities[entity]

    if (existingComponents === undefined) {
      return
    }

    this.middleware.onRemove.forEach(m => m(this, componentName, entity))
    component.delete(entity)

    const newComponents = removeFlag(existingComponents, componentFlags[componentName])
    this.updateMask(entity, existingComponents, newComponents)

    this.components[componentName] = component
  }

  getEntitiesWith(componentNames) {
    const expectedMask = arrayToMask(componentNames, componentFlags)

    return Object.keys(this.masks).reduce((out, mask) => {
      if (hasFlags(mask, expectedMask)) {
        return out.concat(Object.keys(this.masks[mask]))
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
