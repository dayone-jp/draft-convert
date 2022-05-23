import updateMutation from '../../src/util/updateMutation'

describe('updateMutation', function run() {
  const prefix = '<a href="http://test.com">'
  const suffix = '</a>'

  describe('adjusts a mutation disjoint and subsequent to a changed mutation', () => {
    let e = {}
    beforeAll(() => {
      const firstMutation = {
        offset: 1,
        length: 20,
        key: 0,
      }

      const secondMutation = {
        offset: 24,
        length: 5,
        style: 'ITALIC',
      }

      e.updatedMutation = updateMutation(
        secondMutation,
        firstMutation.offset,
        firstMutation.length,
        firstMutation.length + prefix.length + suffix.length,
        prefix.length,
        suffix.length
      )
    })

    it('does not split the updated mutation', () => {
      expect(Array.isArray(e.updateMutation)).toBe(false)
    })

    it('moves the mutation to the correct point', () => {
      expect(e.updatedMutation).toEqual({
        offset: 54,
        length: 5,
        style: 'ITALIC',
      })
    })
  })

  describe('adjusts a mutation completely containing a changed mutation', () => {
    let e = {}
    beforeAll(() => {
      const firstMutation = {
        offset: 5,
        length: 20,
        key: 0,
      }

      const secondMutation = {
        offset: 2,
        length: 25,
        style: 'ITALIC',
      }

      e.updatedMutation = updateMutation(
        secondMutation,
        firstMutation.offset,
        firstMutation.length,
        firstMutation.length + prefix.length + suffix.length,
        prefix.length,
        suffix.length
      )
    })

    it('does not split the updated mutation', () => {
      expect(Array.isArray(e.updateMutation)).toBe(false)
    })

    it('increases the mutation length to the correct size', () => {
      expect(e.updatedMutation).toEqual({
        offset: 2,
        length: 55,
        style: 'ITALIC',
      })
    })
  })

  describe('adjusts a mutation within a changed mutation with a nonzero prefix', () => {
    let e = {}
    beforeAll(() => {
      const firstMutation = {
        offset: 2,
        length: 20,
        key: 0,
      }

      const secondMutation = {
        offset: 5,
        length: 10,
        style: 'ITALIC',
      }

      e.updatedMutation = updateMutation(
        secondMutation,
        firstMutation.offset,
        firstMutation.length,
        firstMutation.length + prefix.length + suffix.length,
        prefix.length,
        suffix.length
      )
    })

    it('does not split the updated mutation', () => {
      expect(Array.isArray(e.updateMutation)).toBe(false)
    })

    it('moves the mutation to the correct point', () => {
      expect(e.updatedMutation).toEqual({
        offset: 31,
        length: 10,
        style: 'ITALIC',
      })
    })
  })

  describe('adjusts for overlap of later mutation with prefix', () => {
    let e = {}
    beforeAll(() => {
      const firstMutation = {
        offset: 1,
        length: 20,
        key: 0,
      }

      const secondMutation = {
        offset: 0,
        length: 12,
        style: 'ITALIC',
      }

      e.updatedMutation = updateMutation(
        secondMutation,
        firstMutation.offset,
        firstMutation.length,
        firstMutation.length + prefix.length + suffix.length,
        prefix.length,
        suffix.length
      )
    })

    it('splits the updated mutation into two', () => {
      expect(Array.isArray(e.updatedMutation)).toBe(true)
      expect(e.updatedMutation.length).toBe(2)
    })

    it('splits the mutation at the correct point', () => {
      const [firstUpdatedMutation, secondUpdatedMutation] = e.updatedMutation

      expect(firstUpdatedMutation).toEqual({
        offset: 0,
        length: 1,
        style: 'ITALIC',
      })
      expect(secondUpdatedMutation).toEqual({
        offset: 27,
        length: 11,
        style: 'ITALIC',
      })
    })
  })

  describe('adjusts for overlap of later mutation with suffix', () => {
    let e = {}
    beforeAll(() => {
      const firstMutation = {
        offset: 0,
        length: 26,
        key: 0,
      }

      const secondMutation = {
        offset: 22,
        length: 34,
        style: 'ITALIC',
      }

      e.updatedMutation = updateMutation(
        secondMutation,
        firstMutation.offset,
        firstMutation.length,
        firstMutation.length + prefix.length + suffix.length,
        prefix.length,
        suffix.length
      )
    })

    it('splits the later mutation into two', () => {
      expect(Array.isArray(e.updatedMutation)).toBe(true)
      expect(e.updatedMutation.length).toBe(2)
    })

    it('splits the mutation at the correct point', () => {
      const [firstUpdatedMutation, secondUpdatedMutation] = e.updatedMutation

      expect(firstUpdatedMutation).toEqual({
        offset: 48,
        length: 4,
        style: 'ITALIC',
      })
      expect(secondUpdatedMutation).toEqual({
        offset: 56,
        length: 30,
        style: 'ITALIC',
      })
    })
  })
})
