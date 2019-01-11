import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'
import BehaviourEngine from './behaviours'
import Component from './component'
import { createPlayer, createTile } from './blueprints'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = {
    components: {},
    resources: {},
  }

  const energyQueue = new EnergyQueue()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity
  let turnWaiting = false

  world.components.position = new Component()
  world.components.takesTurns = new Component({
    onAdd: (entity, { speed }) => {
      energyQueue.add(entity, speed)
    },
    onRemove: entity => {
      energyQueue.remove(entity)
    },
  })
  world.components.playerControlled = new Component()
  world.resources.inputHandler = new InputHandler()

  /* Demo world setup */
  createPlayer(world, { x: 13, y: 9 })
  createTile(world, { sprite: 'grass', x: 11, y: 9 })
  createTile(world, { sprite: 'grass', x: 12, y: 9 })
  createTile(world, { sprite: 'grass', x: 13, y: 9 })
  createTile(world, { sprite: 'grass', x: 14, y: 9 })
  createTile(world, { sprite: 'grass', x: 15, y: 9 })
  createTile(world, { sprite: 'grass', x: 16, y: 9 })
  createTile(world, { sprite: 'grass', x: 17, y: 9 })
  /* */

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
