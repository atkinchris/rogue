import Renderer from './renderer'
import BehaviourEngine from './behaviours'
import buildMap from './blueprints/map'
import World from './types/world'

import './index.css'
import Entity from './types/entity'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity: Entity | undefined
  let turnWaiting = false

  // Demo world setup
  buildMap(world)

  const animate = () => {
    if (!turnWaiting && !nextEntity) {
      nextEntity = world.energyQueue.next()
    }

    if (nextEntity) {
      const action = behaviourEngine.getAction(nextEntity.takesTurns.behaviour, nextEntity)
      turnWaiting = !!action

      if (action && action.type === 'moveTo') {
        const collision = world.collisionMap.isEntityAt(action.payload)

        if (collision) {
          action.cancelled = true
        } else {
          action.subject.moveTo(action.payload)
        }
      }
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
