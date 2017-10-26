import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './store'
import Board from './components/Board'

import './index.css'

const mountElement = document.getElementById('root')
const store = createStore()

const App = () => (
  <Provider store={store}>
    <div className="panel">
      <Board />
    </div>
  </Provider>
)

ReactDOM.render(
  <App />,
  mountElement,
)
