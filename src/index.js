import { v4 as uuid } from 'uuid'

import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'

const withEnergy = new Map()
const position = new Map()
const playerControlled = new Set()

const run = async () => {
  const inputHandler = new InputHandler()
  const renderer = new Renderer()
  await renderer.load()

  const world = {
    components: {
      position,
      withEnergy,
      playerControlled,
    },
  }

  const energyQueue = new EnergyQueue()
  const id = uuid()
  let nextEntity
  let turnWaiting = false

  /* Demo world setup */
  world.components.position.set(id, { sprite: 'player', x: 13, y: 9 })
  world.components.withEnergy.set(id, { speed: 1 })
  world.components.playerControlled.add(id)
  world.components.withEnergy.forEach(({ speed }, entity) => energyQueue.add(entity, speed))
  /* */

  const animate = () => {
    if (!turnWaiting && !nextEntity) {
      nextEntity = energyQueue.next()
    }

    const isPlayerControlled = world.components.playerControlled.has(nextEntity)

    if (isPlayerControlled) {
      const keys = inputHandler.getKeys()

      if (keys && (keys.left || keys.right || keys.up || keys.down)) {
        turnWaiting = false
        const pos = world.components.position.get(id) || {}

        if (keys.left) pos.x -= 1
        else if (keys.right) pos.x += 1
        else if (keys.up) pos.y -= 1
        else if (keys.down) pos.y += 1

        world.components.position.set(id, pos)
      } else {
        turnWaiting = true
      }
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
