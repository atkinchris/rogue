import invert from '../invert'
import { arrayToHash, arrayToMask, maskToArray, hasFlag, hasFlags, addFlag, removeFlag } from '../bitmask'

describe('bitmask', () => {
  const flags = {
    1: 'a',
    2: 'b',
    4: 'c',
    8: 'd',
    16: 'e',
    32: 'f',
  }
  const flagKeys = invert(flags)

  describe('arrayToHash', () => {
    it('creates a hashmap from an array', () => {
      const array = ['a', 'b', 'c', 'd', 'e', 'f']

      expect(arrayToHash(array)).toEqual(flags)
    })
  })

  describe('arrayToMask', () => {
    it('creates a mask from an array of flags', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = 0b110101

      expect(arrayToMask(array, flagKeys)).toBe(mask)
    })
  })

  describe('maskToArray', () => {
    it('creates an array of flags from a mask', () => {
      const mask = 0b110101
      const array = ['a', 'c', 'e', 'f']

      expect(maskToArray(mask, flagKeys)).toEqual(array)
    })
  })

  describe('addFlag', () => {
    it('adds a flag to the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const newMask = addFlag(mask, flagKeys.b)

      expect(newMask).toBe(arrayToMask(['f', 'c', 'e', 'a', 'b'], flagKeys))
    })

    it('has no effect adding an existing flag', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const newMask = addFlag(mask, flagKeys.a)

      expect(newMask).toBe(arrayToMask(['f', 'c', 'e', 'a'], flagKeys))
    })
  })

  describe('removeFlag', () => {
    it('removes a flag from the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const newMask = removeFlag(mask, flagKeys.a)

      expect(newMask).toBe(arrayToMask(['f', 'c', 'e'], flagKeys))
    })

    it('has no effect if the flag is not in the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const newMask = removeFlag(mask, flagKeys.b)

      expect(newMask).toBe(arrayToMask(['f', 'c', 'e', 'a'], flagKeys))
    })
  })

  describe('hasFlag', () => {
    it('returns true if the flag is in the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)

      expect(hasFlag(mask, flagKeys.a)).toBe(true)
      expect(hasFlag(mask, flagKeys.c)).toBe(true)
      expect(hasFlag(mask, flagKeys.e)).toBe(true)
      expect(hasFlag(mask, flagKeys.f)).toBe(true)
    })

    it('returns false if the flag is not in the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)

      expect(hasFlag(mask, flagKeys.b)).toBe(false)
      expect(hasFlag(mask, flagKeys.d)).toBe(false)
    })
  })

  describe('hasFlags', () => {
    it('returns true if all of the flags are in the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const testFlags = arrayToMask(['a', 'c', 'f'], flagKeys)

      expect(hasFlags(mask, testFlags)).toBe(true)
    })

    it('returns false if any of the flags are not in the mask', () => {
      const array = ['f', 'c', 'e', 'a']
      const mask = arrayToMask(array, flagKeys)
      const testFlags = arrayToMask(['a', 'c', 'd'], flagKeys)

      expect(hasFlags(mask, testFlags)).toBe(false)
    })
  })
})
