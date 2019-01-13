const EVENT_DOWN = 'keydown'
const EVENT_UP = 'keyup'

const INPUT_MAP = new Map([['KeyA', 'left'], ['KeyD', 'right'], ['KeyW', 'up'], ['KeyS', 'down']])

interface Keys {
  [key: string]: boolean
}

class InputHandler {
  keys: Keys
  newEvents: boolean

  constructor() {
    this.keys = {}
    this.newEvents = false

    window.addEventListener(EVENT_DOWN, event => {
      const input = INPUT_MAP.get(event.code)
      if (event && !event.repeat && input) {
        this.keys[input] = true
        this.newEvents = true
      }
    })

    window.addEventListener(EVENT_UP, event => {
      const input = INPUT_MAP.get(event.code)
      if (event && !event.repeat && input) {
        this.keys[input] = false
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
