import Store from './utils/store'
import systems from './systems'
import { createPlayer, createWall } from './assemblages'
import runLoop from './utils/loop'
import createInputHandler from './utils/inputHandler'

import './index.css'

const store = new Store()

createInputHandler((direction) => {
  store.setCache('playerIntent', { type: 'move', direction })
  runLoop(store, systems)
})

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

