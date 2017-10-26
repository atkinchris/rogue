import { createStore, combineReducers, compose } from 'redux'

import board from './board'

const buildStore = () => {
  const middleware = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
  const reducer = combineReducers({ board })

  return createStore(reducer, middleware)
}

export default buildStore
