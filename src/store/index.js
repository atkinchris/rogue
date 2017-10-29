import { createStore } from 'redux'

import reducers from './reducers'
import middleware from './middleware'

const buildStore = () => createStore(reducers, middleware)

export default buildStore
