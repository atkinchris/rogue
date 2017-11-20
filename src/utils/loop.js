const runLoop = (store, systems) => {
  const debug = store.getCache('debug')
  let loop = true
  let iteration = 0
  const breakLoop = (message) => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.warn(message)
    }
    loop = false
  }

  while (loop) {
    iteration += 1

    if (iteration > 10) {
      breakLoop('Iteration limit reached')
    }

    systems.forEach(system => system(store, breakLoop))
  }
}

export default runLoop
