import {increaseCount,decreaseCount} from '../Counter'
describe('Counter service', () => {
  test("Should increase count by 1 when function is called", () => {
    [-100,-50,-10,0,10,50,100].forEach((count) => {
      const result  = increaseCount(count)
      expect(result).toBe(count + 1)
    })
  })
  test("Should decrease count by one when function is called", () => {
    [-100,-50,-10,0,10,50,100].forEach((count) => {
      const result  = decreaseCount(count)
      expect(result).toBe(count - 1)
    })
  })
})