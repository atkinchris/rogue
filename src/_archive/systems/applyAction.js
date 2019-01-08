const applyAction = () => (store, action) => {
  if (!action) return

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
