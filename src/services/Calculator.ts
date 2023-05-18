// Kotlin: Native: Optional | Library: Arrow, Rx
// Go: Native: Own implementation | Library Rx
// Java: Native: Optional | Library: Rx or Immutable Data
// Python: Native: Tuples | Library: Fp, Rx
// JS/TS: Native: Promise | Library: Fp , Rx , Immutable Data 

import { CalculatorOperation } from "../views/Calculator/CalculatorView";

// export function calculateResult(firstNumber: number, secondNumber:number, operation: CalculatorOperation): [number, string]
export function calculateResult(firstNumber: number, secondNumber:number, operation: CalculatorOperation): Promise<number>{
  return new Promise ((resolve, reject) => {
    switch(operation) {
    case CalculatorOperation.MULTIPLY:
      return resolve(firstNumber * secondNumber);
    case CalculatorOperation.DIVISION:
      return secondNumber === 0 ? reject('Number must be grater than cero'): resolve(firstNumber/secondNumber);
    case CalculatorOperation.SUB: 
      return resolve(firstNumber - secondNumber)
    default:
      return resolve(firstNumber + secondNumber)
  }})
}