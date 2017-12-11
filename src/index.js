import Store from './utils/store'
import buildLoop from './utils/buildLoop'
import systems from './systems'
import middleware from './middleware'
import createInputHandler from './utils/inputHandler'
import buildMap from './assemblages/map'
import buildOnScreenControls from './utils/onScreenControls'
import buildRenderer from './renderers'
import behaviourEngine from './behaviours'

import './index.css'

const store = new Store({ debug: false, middleware })
const player = buildMap({ store })
const ai = behaviourEngine({ player })
const renderer = buildRenderer({ store })
const runLoop = buildLoop({ systems, store, renderer, ai })

runLoop()

createInputHandler(direction => runLoop({ type: 'move', direction, entity: player }))
buildOnScreenControls()