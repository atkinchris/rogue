import { createStore, compose } from 'redux'

import rootReducer from './reducers'

const buildStore = () => {
  const middleware = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)

  return createStore(rootReducer, middleware)
}

export default buildStore
