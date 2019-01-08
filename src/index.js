import { v4 as uuid } from 'uuid'

import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'

const withEnergy = new Map()
const position = new Map()
const playerControlled = new Map()

const run = async () => {
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

  /* Demo world setup */
  world.components.position.set(id, { sprite: 'player', x: 13, y: 9 })
  world.components.withEnergy.set(id, { speed: 1 })
  world.components.withEnergy.forEach(({ speed }, entity) => energyQueue.add(entity, speed))
  /* */

  const animate = () => {
    if (!nextEntity) {
      nextEntity = energyQueue.next()
    }

    if (nextEntity) {
      const isPlayerControlled = world.components.playerControlled.has(nextEntity)

      console.log(nextEntity, isPlayerControlled)
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
