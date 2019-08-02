const neighboursToFrame = (nesw: boolean[]): number => {
  const binaryString = nesw.map(b => (b ? 1 : 0)).join('')
  return parseInt(binaryString, 2)
}

export { neighboursToFrame }
