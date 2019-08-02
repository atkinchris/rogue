import applyActions from './applyActions'
import BehaviourEngine from './behaviours'
import buildMap from './blueprints/map'
import Renderer from './renderer'
import Entity from './types/entity'
import World from './types/world'

import './index.css'
import ActionsEngine from './systems'

const run = async () => {
  const renderer = new Renderer()
  await renderer.load()

  const world = new World()
  const behaviourEngine = new BehaviourEngine(world)
  const actionsEngine = new ActionsEngine(world)
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
        const resultingActions = actionsEngine.run(action)
        applyActions(world, resultingActions)
      }
    }

    renderer.render(world)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
