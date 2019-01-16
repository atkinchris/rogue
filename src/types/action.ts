import Entity from './entity'

export default interface Action {
  payload: any
  type: string
  subject: Entity
  cancelled?: boolean
}
