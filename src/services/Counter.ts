export function increaseCount(count: number): number {
  return count + 1
}
export function decreaseCount(count:number): number {
  return count - 1
}   
export function multiplyCount(count: number, times: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(count * times)
    }, 2000)
  })
}