class Loop {
  constructor() {
    this.isRunning = false
  }

  run(store, systems) {
    if (this.isRunning) {
      return
    }

    this.isRunning = true

    let loop = true
    let iteration = 0
    const breakLoop = (message) => {
      if (store.debug) {
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

    this.isRunning = false
  }
}

export default Loop
