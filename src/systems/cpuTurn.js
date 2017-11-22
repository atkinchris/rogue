const cpuTurn = () => (store) => {
  const entities = store.getEntitiesWith(['cpuControlled', 'hasTurn'])

  entities.forEach((entity) => {
    // console.log('Enemy turn!', entity)

    store.removeComponent(entity, 'hasTurn')
  })
}

export default cpuTurn
