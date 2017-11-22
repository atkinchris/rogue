import React from 'react'
import { render } from 'react-dom'

import Board from './Board'

const renderReact = () => {
  const rootElement = document.getElementById('root')

  return (store) => {
    const entities = store
      .getEntitiesWith(['tile', 'position'])
      .map(id => ({
        id,
        ...store.getComponent(id, 'position'),
        ...store.getComponent(id, 'tile'),
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
