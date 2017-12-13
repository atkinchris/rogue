class Rect {
  constructor({ x, y, width, height }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get left() {
    return this.x
  }

  get top() {
    return this.y
  }

  get right() {
    return this.x + this.width
  }

  get bottom() {
    return this.y + this.height
  }

  get midX() {
    return Math.round(this.x + (this.width / 2))
  }

  get midY() {
    return Math.round(this.y + (this.height / 2))
  }

  shift(dx, dy) {
    this.x += Math.round(dx)
    this.y += Math.round(dy)
  }

  intersects(rect, border = 0) {
    return !(
      rect.left > this.right + border ||
      rect.right < this.left - border ||
      rect.top > this.bottom + border ||
      rect.bottom < this.top - border
    )
  }
}

export default Rect
