const KEYS = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
}

const dispatchKey = key => () => {
  const e = new Event('keydown')
  e.code = key
  window.dispatchEvent(e)
}

const buildControls = () => {
  Object.keys(KEYS).forEach((key) => {
    const button = document.getElementById(`${key}-button`)

    button.addEventListener('click', dispatchKey(KEYS[key]))
  })
}

export default buildControls
