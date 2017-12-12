import { stringToPos, posToString } from '../utils/positions'
import calculateNeighbours from '../utils/neighbours'

const expandFog = () => (store) => {
  const vision = store.getCache('vision')
  const fogOfWar = store.getCache('fogOfWar')

  Object.keys(vision)
    .filter(key => vision[key] === true)
    .reduce((out, position) => [
      ...out,
      ...calculateNeighbours(stringToPos(position), posToString),
    ], [])
    .forEach((neighbour) => { fogOfWar[neighbour] = true })

  store.setCache('fogOfWar', fogOfWar)
}

export default expandFog
