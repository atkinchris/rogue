import Action from './action'
import World from './world'

export default interface System {
  run: (world: World, actions: Action[]) => Action[]
}
