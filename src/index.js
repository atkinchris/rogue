import * as PIXI from 'pixi.js'

import buildOnScreenControls from './utils/onScreenControls'

import './index.css'
import Renderer from './renderer'
import deltaTime from './deltaTime'

buildOnScreenControls()

const world = {
  entities: [
    {
      sprite: 'player',
      x: 400,
      y: 300,
    },
  ],
}
const renderer = new Renderer()
const time = deltaTime()

function animate() {
  const delta = time()
  renderer.render(world, delta)

  requestAnimationFrame(animate)
}

function setup() {
  requestAnimationFrame(animate)
}

PIXI.loader.add('assets/spritesheet.json').load(setup)
