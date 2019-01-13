import Entity from '../types/entity'

interface Action {
  payload: any
  type: string
  subject: Entity
  cancelled?: boolean
}

export default Action
