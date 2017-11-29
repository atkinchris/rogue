import React from 'react'
import { render } from 'react-dom'

import Board from './Board'

const renderReact = () => {
  const rootElement = document.getElementById('root')

  return ({ entities }) => render(
    <div className="panel">
      <Board entities={entities} />
    </div>,
    rootElement,
  )
}

export default renderReact
