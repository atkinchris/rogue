import buildOnScreenControls from './utils/onScreenControls'

import './index.css'
import Renderer from './renderer'
import deltaTime from './deltaTime'

buildOnScreenControls()

const run = async () => {
  const world = {
    entities: [
      {
        sprite: 'player',
        x: 13,
        y: 9,
      },
    ],
  }
  const time = deltaTime()

  const renderer = new Renderer()
  await renderer.load()

  const animate = () => {
    const delta = time()
    renderer.render(world, delta)

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

// eslint-disable-next-line no-console
run().catch(console.error)
