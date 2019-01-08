import * as PIXI from 'pixi.js'

import buildOnScreenControls from './utils/onScreenControls'

import './index.css'
import Renderer from './renderer'

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
let oldTime = Date.now()
const renderer = new Renderer()

function animate() {
  const newTime = Date.now()
  let deltaTime = newTime - oldTime
  oldTime = newTime
  if (deltaTime < 0) deltaTime = 0
  if (deltaTime > 1000) deltaTime = 1000
  const deltaFrame = (deltaTime * 60) / 1000

  renderer.render(world, deltaFrame)

  requestAnimationFrame(animate)
}

function setup() {
  requestAnimationFrame(animate)
}

PIXI.loader.add('assets/spritesheet.json').load(setup)
