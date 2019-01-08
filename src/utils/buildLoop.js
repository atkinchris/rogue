const buildLoop = ({ systems, store, renderer, ai }) => {
  let isRunning = false
  const { turnQueue } = store
  const runSystem = action => system => system(store, action)

  return playerAction => {
    if (isRunning) return

    isRunning = true
    let action = playerAction && { ...playerAction }
    let iteration = 0

    while (iteration < 20) {
      iteration += 1
      if (store.hasComponent(turnQueue.peek(), 'playerControlled') && !action) {
        break
      }

      const entity = turnQueue.next()

      action = action || ai(entity, store)
      systems.forEach(runSystem(action))

      action = null
    }

    renderer()

    isRunning = false
  }
}

export default buildLoop
