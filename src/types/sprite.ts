export default interface Sprite {
  name: string
  frame?: number
  layer?: string
  isContinuous?: boolean
  fitsInWalls?: boolean
  flip?: boolean
}
