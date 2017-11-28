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
        const posString = posToString(position)
        let visibleState

        if (vision[posString]) {
          visibleState = 'visible'
        } else if (fogOfWar[posString] && store.hasComponent(id, 'visibleInFog')) {
          visibleState = 'visibleInFog'
        } else {
          visibleState = 'hidden'
        }

        return {
          id,
          type: store.getComponent(id, 'type'),
          position,
          visibleState,
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
