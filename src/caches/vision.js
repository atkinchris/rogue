const cacheVision = () => (store) => {
  const entities = store.getEntitiesWith(['visible'])

  store.setCache('vision', entities)
}

export default cacheVision
