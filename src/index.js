import './index.css'
import Renderer from './renderer'
import BehaviourEngine from './behaviours'
import World from './world'
import buildMap from './blueprints/map'
import { createWall } from './blueprints'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  global.world = world
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity
  let turnWaiting = false

  // Demo world setup
  buildMap(world)

  for (let iY = 0; iY < 4; iY += 1) {
    for (let iX = 0; iX < 4; iX += 1) {
      createWall(world, { x: 17 + iX, y: 10 + iY, frame: 4 * iY + iX })
    }
  }

  const animate = () => {
    if (!turnWaiting && !nextEntity) {
      nextEntity = world.resources.energyQueue.next()
    }

    if (nextEntity) {
      const action = behaviourEngine.getAction(nextEntity.takesTurns.behaviour, nextEntity)
      turnWaiting = !!action

      if (action && action.type === 'moveTo') {
        action.subject.moveTo(action.payload)
      }
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
