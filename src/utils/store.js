import { v4 as uuid } from 'uuid'

class Store {
  constructor() {
    this.entities = {}
    this.components = {}
  }

  createEntity() {
    const id = uuid()
    this.entities[id] = true

    return id
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
    console.log(this.components)
  }
}

export default Store
