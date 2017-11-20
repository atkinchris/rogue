import Store from './utils/store'
import systems from './systems'
import runLoop from './utils/loop'
import createInputHandler from './utils/inputHandler'
import buildMap from './assemblages/map'
import buildOnScreenControls from './utils/onScreenControls'

import './index.css'

const store = new Store()

createInputHandler((direction) => {
  store.setCache('playerIntent', { type: 'move', direction })
  runLoop(store, systems)
})

buildMap(store)
runLoop(store, systems)

buildOnScreenControls()
