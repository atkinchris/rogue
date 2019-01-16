import Renderer from './renderer'
import BehaviourEngine from './behaviours'
import buildMap from './blueprints/map'
import World from './types/world'
import Entity from './types/entity'
import processAction from './processActions'
import applyActions from './applyActions'

import './index.css'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  const behaviourEngine = new BehaviourEngine(world)
  let nextEntity: Entity | undefined
  let turnWaiting = false

  // Demo world setup
  buildMap(world)
  world.updateSprites()

  const animate = () => {
    if (!turnWaiting && !nextEntity) {
      nextEntity = world.energyQueue.next()
    }

    if (nextEntity) {
      const action = behaviourEngine.getAction(nextEntity.takesTurns!.behaviour, nextEntity)
      turnWaiting = !!action

      if (action) {
        applyActions(world, processAction(world, action))
      }
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
