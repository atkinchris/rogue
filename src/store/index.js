import { createStore } from 'redux'

const reducer = (state, action) => ({
  ...state,
  ...action.payload,
})

export default () => createStore(reducer)
