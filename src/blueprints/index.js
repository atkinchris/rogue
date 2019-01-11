import { v4 as uuid } from 'uuid'

const createPlayer = (world, { x, y }) => {
  const id = uuid()
  world.components.position.add(id, { sprite: 'player', x, y, layer: 'foreground' })
  world.components.takesTurns.add(id, { speed: 1, behaviour: 'playerControlled' })
  world.components.playerControlled.add(id)
}

const createTile = (world, { x, y, sprite = 'grass' }) => {
  const id = uuid()
  world.components.position.add(id, { sprite, x, y, layer: 'background' })
}

export { createPlayer, createTile }
