const deltaTime = () => {
  let oldTime = Date.now()

  return () => {
    const newTime = Date.now()
    let difference = newTime - oldTime

    oldTime = newTime

    if (deltaTime < 0) {
      difference = 0
    }

    if (deltaTime > 1000) {
      difference = 1000
    }

    const frame = (difference * 60) / 1000

    return frame
  }
}

export default deltaTime
