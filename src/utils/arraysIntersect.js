const arraysIntersect = (_arrays) => {
  const arrays = _arrays.sort((a, b) => a.length - b.length)

  return arrays.shift().filter(v => arrays.every(a => a.indexOf(v) !== -1))
}

export default arraysIntersect
