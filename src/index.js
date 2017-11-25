import Store from './utils/store'
import buildLoop from './utils/buildLoop'
import systems from './systems'
import createInputHandler from './utils/inputHandler'
import buildMap from './assemblages/map'
import buildOnScreenControls from './utils/onScreenControls'

import './index.css'

const store = new Store({ debug: false })
const runLoop = buildLoop({ systems, store })
const player = buildMap(store)

createInputHandler((direction) => {
  runLoop({ type: 'move', direction, entity: player })
})

runLoop({})

buildOnScreenControls()
