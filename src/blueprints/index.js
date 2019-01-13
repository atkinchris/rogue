import { v4 as uuid } from 'uuid'

const createPlayer = (world, { x, y }) => {
  const entity = uuid()
  world.getComponent('collides').add(entity)
  world.getComponent('position').add(entity, { sprite: 'player', x, y, layer: 'foreground' })
  world.getComponent('takesTurns').add(entity, { speed: 1, behaviour: 'playerControlled' })
  world.getComponent('playerControlled').add(entity)
}

const createTile = (world, { x, y, sprite = 'grass' }) => {
  const entity = uuid()
  world.getComponent('position').add(entity, { sprite, x, y, layer: 'background' })
}

const createWall = (world, { x, y, frame }) => {
  const entity = uuid()
  world.getComponent('collides').add(entity)
  world.getComponent('position').add(entity, { sprite: 'wall', x, y, layer: 'background', frame })
}

export { createPlayer, createTile, createWall }
