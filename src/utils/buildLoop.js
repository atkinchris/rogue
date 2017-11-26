const buildLoop = ({ systems = [], store = {}, caches = [], ai = null }) => {
  let isRunning = false
  const { turnQueue } = store
  const runSystem = action => system => system(store, action)
  const runCache = entity => cache => cache(store, entity)

  return (playerAction) => {
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
      caches.forEach(runCache(entity))

      action = action || ai.getAction(entity, store)
      systems.forEach(runSystem(action))

      action = null
    }

    isRunning = false
  }
}

export default buildLoop
