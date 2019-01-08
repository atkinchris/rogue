import { v4 as uuid } from 'uuid'
import buildOnScreenControls from './utils/onScreenControls'

import './index.css'
import Renderer from './renderer'
import EnergyQueue from './energyQueue'

buildOnScreenControls()

const withEnergy = new Map()
const position = new Map()

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = {
    components: {
      position,
      withEnergy,
    },
  }

  const energyQueue = new EnergyQueue()
  const id = uuid()
  world.components.position.set(id, { sprite: 'player', x: 13, y: 9 })
  world.components.withEnergy.set(id, { speed: 1 })
  world.components.withEnergy.forEach(({ speed }, entity) => energyQueue.add(entity, speed))

  const animate = () => {
    const nextEntity = energyQueue.next()
    console.log(nextEntity)

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
