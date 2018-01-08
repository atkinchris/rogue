/* eslint-disable no-bitwise */

const arrayToHash = array => array.reduce((out, value, index) => {
  // eslint-disable-next-line no-param-reassign
  out[2 ** index] = value
  return out
}, {})

const arrayToMask = (array, flags) => array
  .map(flag => flags[flag])
  .reduce((out, flag) => out | flag, 0)

const addFlag = (mask, flag) => mask | flag

const removeFlag = (mask, flag) => mask & ~flag

const hasFlag = (mask, flag) => !!(mask & flag)

const hasFlags = (mask, flagsMask) => (mask | flagsMask) === parseInt(mask, 10)

const maskToArray = (mask, flags) => Object.keys(flags).reduce((out, flag) => {
  const flagMask = flags[flag]

  if (hasFlag(mask, flagMask)) {
    out.push(flag)
  }

  return out
}, [])

export {
  arrayToHash,
  arrayToMask,
  maskToArray,
  hasFlag,
  hasFlags,
  addFlag,
  removeFlag,
}
