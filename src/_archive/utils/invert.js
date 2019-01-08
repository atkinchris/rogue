const invert = object =>
  Object.keys(object).reduce((out, key) => {
    // eslint-disable-next-line no-param-reassign
    out[object[key]] = key
    return out
  }, {})

export default invert
