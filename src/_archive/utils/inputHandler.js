const EVENT = 'keydown'

const createInputHandler = callback => {
  const handler = event => {
    if (event && !event.repeat) {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          callback('up')
          break
        case 'KeyS':
        case 'ArrowDown':
          callback('down')
          break
        case 'KeyA':
        case 'ArrowLeft':
          callback('left')
          break
        case 'KeyD':
        case 'ArrowRight':
          callback('right')
          break
        default:
          break
      }
    }
  }

  window.addEventListener(EVENT, handler)

  return () => window.removeEventListener(EVENT, handler)
}

export default createInputHandler
