import { describe, it, expect } from 'vitest'
const sum = (a: number, b: number) => a + b

describe('sum', () => {
  it('should sum two numbers', () => {
    const result = sum(2, 3)
    expect(result).toBe(5)
  })
})
