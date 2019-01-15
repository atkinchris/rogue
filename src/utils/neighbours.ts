const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180

const neighboursToFrame = (nesw: boolean[]): number => {
  const binaryString = nesw.map(b => (b ? 1 : 0)).join('')
  return parseInt(binaryString, 2)
}

const neighboursToRotation = (nesw: boolean[]): number => {
  const [n, e, s, w] = nesw
  if (e || w) return degreesToRadians(0)
  if (n || s) return degreesToRadians(90)
  return 0
}

export { neighboursToFrame, neighboursToRotation }
