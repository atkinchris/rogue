const runLoop = (store, systems) => {
  let loop = true
  let iteration = 0
  const breakLoop = (message) => {
    console.warn(message)
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
