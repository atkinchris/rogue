import { v4 as uuid } from 'uuid'

import { EnergyQueue } from './Queue'
import { hasFlag, hasFlags, arrayToMask, addFlag, removeFlag } from '../utils/bitmask'
import componentFlags from '../components'

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
    const staticFilter = bool => ([, mask]) => hasFlag(mask, componentFlags.isStatic) === bool
    this.entitiesDynamic = new Map([...this.entities].filter(staticFilter(false)))
    this.entitiesStatic = new Map([...this.entities].filter(staticFilter(true)))
  }

  createEntity(isStatic = false) {
    const id = uuid()
    this.entities.set(id, isStatic ? componentFlags.isStatic : 0)

    this.cacheEntities()

    return id
  }

  removeEntity(entity) {
    Object.keys(this.components).forEach(component => this.removeComponent(entity, component))

    this.entities.delete(entity)

    this.cacheEntities()
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

    if (existingComponents === undefined) {
      throw Error(`Attempted to add component to entity that does not exist (${entity})`)
    }

    const previous = component.get(entity)
    const next = state

    this.middleware.onAdd.forEach(m => m(this, componentName, entity, { previous, next }))
    component.set(entity, next)
    this.entities.set(entity, addFlag(existingComponents, componentFlags[componentName]))

    this.components[componentName] = component
    // this.cacheEntities()
  }

  removeComponent(entity, componentName) {
    const component = this.components[componentName] || new Map()
    const existingComponents = this.entities.get(entity)

    if (existingComponents === undefined) {
      return
    }

    this.middleware.onRemove.forEach(m => m(this, componentName, entity))
    component.delete(entity)
    this.entities.set(entity, removeFlag(existingComponents, componentFlags[componentName]))

    this.components[componentName] = component
    // this.cacheEntities()
  }

  // getEntitiesWith(componentNames, includeStatic = false) {
  getEntitiesWith(componentNames) {
    // const entities = includeStatic ? this.entities : this.entitiesDynamic
    const expectedMask = arrayToMask(componentNames, componentFlags)

    return [...this.entities].reduce((out, entity) => {
      const [id, mask] = entity

      if (hasFlags(mask, expectedMask)) {
        out.push(id)
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
