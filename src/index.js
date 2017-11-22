import Store from './utils/store'
import Loop from './utils/loop'
import systems from './systems'
import createInputHandler from './utils/inputHandler'
import buildMap from './assemblages/map'
import buildOnScreenControls from './utils/onScreenControls'

import './index.css'

const store = new Store()
const loop = new Loop()

// store.debug = true

createInputHandler((direction) => {
  store.setCache('playerIntent', { type: 'move', direction })
  loop.run(store, systems)
})

buildMap(store)
loop.run(store, systems)

buildOnScreenControls()
