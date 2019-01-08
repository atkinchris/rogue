import * as PIXI from 'pixi.js'

import buildOnScreenControls from './utils/onScreenControls'

import './index.css'

buildOnScreenControls()

const world = {}
const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb })
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
document.body.appendChild(app.view)
let oldTime = Date.now()

function animate() {
  const newTime = Date.now()
  let deltaTime = newTime - oldTime
  oldTime = newTime
  if (deltaTime < 0) deltaTime = 0
  if (deltaTime > 1000) deltaTime = 1000
  const deltaFrame = (deltaTime * 60) / 1000

  world.sprite.rotation += 0.0 * deltaFrame

  app.render()

  requestAnimationFrame(animate)
}

function setup() {
  const sprite = PIXI.Sprite.fromFrame('player.png')
  sprite.anchor.set(0.5)
  sprite.x = app.screen.width / 2
  sprite.y = app.screen.height / 2

  app.stage.addChild(sprite)
  world.sprite = sprite

  requestAnimationFrame(animate)
}

PIXI.loader.add('assets/spritesheet.json').load(setup)
