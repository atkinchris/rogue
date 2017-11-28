import React from 'react'
import { render } from 'react-dom'

import posToString from '../../utils/posToString'
import Board from './Board'

const renderReact = () => {
  const rootElement = document.getElementById('root')

  return (store) => {
    const vision = store.getCache('vision')
    const fogOfWar = store.getCache('fogOfWar')
    const entities = store
      .getEntitiesWith(['visible', 'position'])
      .map((id) => {
        const position = store.getComponent(id, 'position')

        return {
          id,
          type: store.getComponent(id, 'type'),
          position,
          visible: vision[posToString(position)],
          seen: fogOfWar[posToString(position)],
        }
      })

    render(
      <div className="panel">
        <Board entities={entities} vision={vision} fogOfWar={fogOfWar} />
      </div>,
      rootElement,
    )
  }
}

export default renderReact
