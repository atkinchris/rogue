const neighboursToFrame = (nesw: boolean[]): number => parseInt(nesw.map(b => (b ? 1 : 0)).join(), 2)

export default neighboursToFrame
