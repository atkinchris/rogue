const debug = () => (store) => {
  if (!store.debug) return

  console.log('Tick!')
}

export default debug
