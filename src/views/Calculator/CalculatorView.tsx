import React from "react";
import styles from "./CalculatorView.module.css";

export enum CalculatorOperation {
  ADD = "add",
  SUB = "sub",
  MULTIPLY = "multiply",
  DIVISION = "div",
}

export function getCalculatorOperationFromString(value: string): CalculatorOperation {
  return Object.entries(CalculatorOperation)
    .filter(
      ([_, operationValue]) =>
        operationValue.toLowerCase() === value.toLowerCase()
    )
    .reduce<CalculatorOperation>((acc, current) => current[1] || acc, CalculatorOperation.ADD);
}

export interface ICalculatorView {
  firstNumber: number;
  onFirstNumberChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  secondNumber: number;
  onSecondNumberChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ) => void;
  result: number;
  hasError?: string;
  operation: CalculatorOperation;
  onOperationSelected?: (event: CalculatorOperation) => void;
}

export function CalcultatorView(props: ICalculatorView): JSX.Element {
  return (
    <div>
      <h3>Calculator</h3>
      <div className={styles.calculatorContainer}>
        <input
          data-testid="firstNumber"
          type="number"
          placeholder="Number1"
          value={props.firstNumber}
          onChange={
            props.onFirstNumberChange ? props.onFirstNumberChange : () => {}
          }
        />
        <select
          data-testid="operation"
          value={props.operation}
          onChange={(event) =>
            props.onOperationSelected
              ? props.onOperationSelected(
                  getCalculatorOperationFromString(event.target.value)
                )
              : null
          }
        >
          <option data-testid="option-add" value={CalculatorOperation.ADD}>
            +
          </option>
          <option data-testid="option-sub" value={CalculatorOperation.SUB}>
            -
          </option>
          <option
            data-testid="option-multiply"
            value={CalculatorOperation.MULTIPLY}
          >
            x
          </option>
          <option data-testid="option-div" value={CalculatorOperation.DIVISION}>
            /
          </option>
        </select>
        <input
          data-testid="secondNumber"
          type="number"
          placeholder="Number2"
          value={props.secondNumber}
          onChange={
            props.onSecondNumberChange ? props.onSecondNumberChange : () => {}
          }
        />
        {props.hasError ? (
          <p data-testid="errorMessage" className={styles.error}>
            {props.hasError}
          </p>
        ) : (
          <input
            data-testid="result"
            type="number"
            placeholder="Result"
            disabled
            value={props.result}
            readOnly
          />
        )}
      </div>
    </div>
  );
}
