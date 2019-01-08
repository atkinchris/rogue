const EVENT_DOWN = 'keydown'
const EVENT_UP = 'keyup'

const INPUT_MAP = {
  KeyA: 'left',
  KeyD: 'right',
  KeyW: 'up',
  KeyS: 'down',
}

class InputHandler {
  constructor() {
    this.keys = {}
    this.newEvents = false

    const onDown = window.addEventListener(EVENT_DOWN, event => {
      if (event && !event.repeat && INPUT_MAP[event.code]) {
        this.keys[INPUT_MAP[event.code]] = true
        this.newEvents = true
      }
    })

    const onUp = window.addEventListener(EVENT_UP, event => {
      if (event && !event.repeat && INPUT_MAP[event.code]) {
        this.keys[INPUT_MAP[event.code]] = false
        this.newEvents = true
      }
    })

    this.destroy = () => {
      window.removeEventListener(EVENT_DOWN, onDown)
      window.removeEventListener(EVENT_UP, onUp)
    }
  }

  getKeys() {
    if (this.newEvents) {
      this.newEvents = false
      return this.keys
    }

    return undefined
  }
}

export default InputHandler
