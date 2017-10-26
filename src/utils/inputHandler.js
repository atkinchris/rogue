const EVENT = 'keydown'

const createInputHandler = (callback) => {
  const handler = (event) => {
    if (event && !event.repeat) {
      callback(event.code)
    }
  }

  window.addEventListener(EVENT, handler)

  return () => window.removeEventListener(EVENT, handler)
}

export default createInputHandler
