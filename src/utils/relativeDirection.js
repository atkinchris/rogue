const relativeDirection = (a, b) => {
  if (a.x === b.x && a.y === b.y) {
    return 'none'
  }

  const angle = ((Math.atan2(a.y - b.y, b.x - a.x) * 180) / Math.PI) + 90

  if (angle >= 45 && angle < 135) {
    return 'right'
  }

  if (angle >= 135 && angle < 225) {
    return 'up'
  }

  if (angle >= 225 && angle < 315) {
    return 'left'
  }

  if (angle >= 315 || angle < 45) {
    return 'down'
  }

  return 'invalid'
}

export default relativeDirection
