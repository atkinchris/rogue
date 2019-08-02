import Entity from '../types/entity'
import Position from '../types/position'
import World from '../types/world'

const createPlayer = (world: World, { x, y }: Position) =>
  Entity.create(world, {
    collides: true,
    position: { x, y },
    sprite: { name: 'player', layer: 'foreground' },
    takesTurns: { speed: 1, behaviour: 'playerControlled' },
  })

const createGrass = (world: World, { x, y }: Position) =>
  Entity.create(world, {
    position: { x, y },
    sprite: { name: 'grass', layer: 'background' },
  })

const createWall = (world: World, { x, y }: Position) =>
  Entity.create(world, {
    position: { x, y },
    sprite: { name: 'wall', layer: 'background', isContinuous: true },
    collides: true,
  })

const createDoor = (world: World, { x, y }: Position) =>
  Entity.create(world, {
    position: { x, y },
    sprite: { name: 'door', frame: 0, layer: 'foreground', fitsInWalls: true },
    collides: true,
    isDoor: true,
  })

export { createPlayer, createGrass, createWall, createDoor }
