const applyAction = () => (store, action) => {
  const { type, entity } = action

  switch (type) {
    case 'move': {
      const { direction } = action
      store.addComponent(entity, 'moveIntent', { direction })
      store.removeComponent(entity, 'hasTurn')
      break
    }
    default:
      break
  }
}

export default applyAction
