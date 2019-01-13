import Entity from '../entity'

const createPlayer = (world, { x, y }) =>
  Entity.Create(world, {
    collides: true,
    position: { x, y },
    sprite: { name: 'player', layer: 'foreground' },
    takesTurns: { speed: 1, behaviour: 'playerControlled' },
  })

const createGrass = (world, { x, y }) =>
  Entity.Create(world, {
    position: { x, y },
    sprite: { name: 'grass', layer: 'background' },
  })

const createWall = (world, { x, y, frame }) =>
  Entity.Create(world, {
    position: { x, y },
    sprite: { name: 'wall', layer: 'background', frame },
    collides: true,
  })

export { createPlayer, createGrass, createWall }
