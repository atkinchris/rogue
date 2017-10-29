import { createSelector } from 'reselect'

const selectPlayer = state => state.player
const selectEntities = state => state.entities
const selectEntitiesByCoord = createSelector(
  selectEntities,
  (entities) => {
    const map = []

    entities.forEach((entity) => {
      const { x, y } = entity

      if (!map[x]) {
        map[x] = []
      }

      map[x][y] = entity
    })

    return map
  },
)

export {
  selectPlayer,
  selectEntities,
  selectEntitiesByCoord,
}
