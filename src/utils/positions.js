export const posToString = ({ x, y }) => `${x},${y}`
export const stringToPos = (string) => {
  const [x, y] = string.split(',')
  return {
    x: Number.parseInt(x, 10),
    y: Number.parseInt(y, 10),
  }
}
