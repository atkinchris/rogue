const mergeSegment = (_segments, segment) => {
  const segments = [..._segments]
  const { length } = segments

  if (length === 0) {
    return [segment]
  }

  for (let index = 0; index < length; index += 1) {
    const element = segments[index]

    if (element.start >= segment.start) {
      segments.splice(index, 0, segment)
      break
    }

    if (index === length - 1) {
      segments.push(segment)
    }
  }

  return segments.reduce((output, current) => {
    const previous = output[output.length - 1]

    if (!previous) {
      return [current]
    }

    if (current.start <= previous.end && current.end <= previous.end) {
      return output
    }

    if (current.start <= previous.end) {
      previous.end = current.end
      return output
    }

    return [...output, current]
  }, [])
}

export default mergeSegment
