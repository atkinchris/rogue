import Entity from '../types/entity'
import World from '../types/world'
import Position from '../types/position'

const createPlayer = (world: World, { x, y }: Position) =>
  Entity.Create(world, {
    collides: true,
    position: { x, y },
    sprite: { name: 'player', layer: 'foreground' },
    takesTurns: { speed: 1, behaviour: 'playerControlled' },
  })

const createGrass = (world: World, { x, y }: Position) =>
  Entity.Create(world, {
    position: { x, y },
    sprite: { name: 'grass', layer: 'background' },
  })

const createWall = (world: World, { x, y }: Position) =>
  Entity.Create(world, {
    position: { x, y },
    sprite: { name: 'wall', layer: 'background' },
    collides: true,
  })

export { createPlayer, createGrass, createWall }
