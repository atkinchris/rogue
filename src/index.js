import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'
import BehaviourEngine from './behaviours'
import Component from './component'
import World from './world'
import buildMap from './blueprints/map'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  const energyQueue = new EnergyQueue()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity
  let turnWaiting = false

  world.addResource('inputHandler', new InputHandler())
  world.addComponent('position', new Component())
  world.addComponent('playerControlled', new Component())

  const takesTurns = new Component()
  takesTurns.on('added', (entity, { speed }) => energyQueue.add(entity, speed))
  takesTurns.on('removed', entity => energyQueue.remove(entity))
  world.addComponent('takesTurns', takesTurns)

  // Demo world setup
  buildMap(world)

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
