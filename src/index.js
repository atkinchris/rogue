import Store from './utils/store'
import buildLoop from './utils/buildLoop'
import systems from './systems'
import middleware from './middleware'
import createInputHandler from './utils/inputHandler'
import buildMap from './assemblages/map'
import buildOnScreenControls from './utils/onScreenControls'
import buildRenderer from './renderers'

import './index.css'

const store = new Store({ debug: false, middleware })
const renderer = buildRenderer({ store })
const runLoop = buildLoop({ systems, store, renderer })
const player = buildMap(store)

runLoop({})

createInputHandler(direction => runLoop({ type: 'move', direction, entity: player }))
buildOnScreenControls()
