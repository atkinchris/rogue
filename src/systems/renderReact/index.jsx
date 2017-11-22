import React from 'react'
import { render } from 'react-dom'

import Board from './Board'

const renderReact = () => {
  const rootElement = document.getElementById('root')

  return (store) => {
    const entities = store
      .getEntitiesWith(['visible', 'position'])
      .map(id => ({
        id,
        type: store.getComponent(id, 'type'),
        position: store.getComponent(id, 'position'),
      }))

    render(
      <div className="panel">
        <Board entities={entities} />
      </div>,
      rootElement,
    )
  }
}

export default renderReact
