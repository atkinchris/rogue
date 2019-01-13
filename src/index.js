import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'
import BehaviourEngine from './behaviours'
import Component from './component'
import World from './world'
import buildMap from './blueprints/map'
import SpatialMap from './spatialMap'
import { createWall } from './blueprints'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  global.world = world
  const energyQueue = new EnergyQueue()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity
  let turnWaiting = false

  const collisionMap = new SpatialMap()

  world.addResource('inputHandler', new InputHandler())
  world.addResource('collisionMap', collisionMap)

  world.addComponent('playerControlled', new Component())

  const collides = new Component()
  collides.on('added', entity => {
    const pos = world.getComponent('position').get(entity)
    if (pos) {
      collisionMap.addEntityAt(entity, pos)
    }
  })
  world.addComponent('collides', collides)

  const position = new Component()
  position.on('added', (entity, pos) => {
    if (world.getComponent('collides').has(entity)) {
      collisionMap.addEntityAt(entity, pos)
    }
  })
  world.addComponent('position', position)

  const takesTurns = new Component()
  takesTurns.on('added', (entity, { speed }) => energyQueue.add(entity, speed))
  takesTurns.on('removed', entity => energyQueue.remove(entity))
  world.addComponent('takesTurns', takesTurns)

  // Demo world setup
  buildMap(world)

  for (let iY = 0; iY < 4; iY += 1) {
    for (let iX = 0; iX < 4; iX += 1) {
      createWall(world, { x: 17 + iX, y: 10 + iY, frame: 4 * iY + iX })
    }
  }

  const animate = () => {
    if (!turnWaiting && !nextEntity) {
      nextEntity = energyQueue.next()
    }

    if (nextEntity) {
      const { behaviour } = world.components.takesTurns.get(nextEntity)
      const action = behaviourEngine.getAction(behaviour, nextEntity)
      turnWaiting = !!action
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
