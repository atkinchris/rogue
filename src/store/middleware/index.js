import { applyMiddleware, compose } from 'redux'

import movement from './movement'

export default compose(
  applyMiddleware(movement),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)
