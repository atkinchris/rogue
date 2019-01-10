import { v4 as uuid } from 'uuid'

import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'
import BehaviourEngine from './behaviours'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = {
    components: {
      position: new Map(),
      takesTurns: new Map(),
      playerControlled: new Set(),
    },
    resources: {
      inputHandler: new InputHandler(),
    },
  }

  const energyQueue = new EnergyQueue()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity
  let turnWaiting = false

  /* Demo world setup */
  {
    const id = uuid()
    world.components.position.set(id, { sprite: 'player', x: 13, y: 9, layer: 'foreground' })
    world.components.takesTurns.set(id, { speed: 1, behaviour: 'playerControlled' })
    world.components.playerControlled.add(id)
  }
  world.components.position.set(uuid(), { sprite: 'grass', x: 11, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 12, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 13, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 14, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 15, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 16, y: 9 })
  world.components.position.set(uuid(), { sprite: 'grass', x: 17, y: 9 })
  world.components.takesTurns.forEach(({ speed }, entity) => energyQueue.add(entity, speed))
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
