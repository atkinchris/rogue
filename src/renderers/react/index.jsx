import React from 'react'
import { render } from 'react-dom'

import Board from './Board'

const renderReact = () => {
  const rootElement = document.getElementById('root')

  return ({ entities, bounds: { width, height } }) => render(
    <div className="panel">
      <Board entities={entities} width={width} height={height} />
    </div>,
    rootElement,
  )
}

export default renderReact
