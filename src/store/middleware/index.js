import { applyMiddleware, compose } from 'redux'

import movement from './movement'
import collision from './collision'

export default compose(
  applyMiddleware(movement, collision),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)
