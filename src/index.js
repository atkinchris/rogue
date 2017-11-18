import Store from './utils/store'
import renderSystem from './systems/render'
import playerControlSystem from './systems/playerControl'
import applyMovementSystem from './systems/applyMovement'
import evaluateMovementSystem from './systems/evaluateMovement'
import collisionSystem from './systems/collision'
import { createPlayer, createWall } from './assemblages'
import runLoop from './utils/loop'
import createInputHandler from './utils/inputHandler'

import './index.css'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const store = new Store()

let intent = null

const getIntent = () => {
  const i = Object.assign({}, intent)
  intent = null
  return i
}

const systems = [
  playerControlSystem(getIntent),
  evaluateMovementSystem(),
  collisionSystem(),
  applyMovementSystem(),
  renderSystem(context),
]

const setIntent = (direction) => {
  intent = { type: 'move', direction }
  runLoop(store, systems)
}

createInputHandler(setIntent)
createPlayer(store)

for (let x = 0; x < 10; x += 1) {
  createWall(store, { x, y: 0 })
  createWall(store, { x, y: 9 })
}

for (let y = 1; y < 9; y += 1) {
  createWall(store, { x: 0, y })
  createWall(store, { x: 9, y })
}

runLoop(store, systems)

