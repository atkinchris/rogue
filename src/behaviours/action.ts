import Entity from '../types/entity'

export default interface Action {
  payload: any
  type: string
  subject: Entity
  cancelled?: boolean
}
