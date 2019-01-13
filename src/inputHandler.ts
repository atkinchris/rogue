const EVENT_DOWN = 'keydown'
const EVENT_UP = 'keyup'

const INPUT_MAP = {
  KeyA: 'left',
  KeyD: 'right',
  KeyW: 'up',
  KeyS: 'down',
}

class InputHandler {
  keys: object
  newEvents: boolean

  constructor() {
    this.keys = {}
    this.newEvents = false

    window.addEventListener(EVENT_DOWN, event => {
      if (event && !event.repeat && INPUT_MAP[event.code]) {
        this.keys[INPUT_MAP[event.code]] = true
        this.newEvents = true
      }
    })

    window.addEventListener(EVENT_UP, event => {
      if (event && !event.repeat && INPUT_MAP[event.code]) {
        this.keys[INPUT_MAP[event.code]] = false
        this.newEvents = true
      }
    })
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
