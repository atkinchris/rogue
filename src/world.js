class World {
  constructor() {
    this.components = {}
    this.resources = {}
  }

  addComponent(id, component) {
    this.components[id] = component
  }

  getComponent(id) {
    return this.components[id]
  }

  addResource(id, resource) {
    this.resources[id] = resource
  }

  getResource(id) {
    return this.resources[id]
  }
}

export default World
