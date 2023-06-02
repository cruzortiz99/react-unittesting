import React, { useCallback, useEffect, useState } from "react";
import { CalculatorOperation, CalcultatorView } from "./CalculatorView";
import { calculateResult } from "../../services/Calculator";

export type CalculatorProps = {
  initialFirstNumber?: number;
  initialSecondNumber?: number;
  initialOperationSelected?: CalculatorOperation;
};
export function Calcultator(props: CalculatorProps): JSX.Element {
  const [firstNumber, _setFirstNumber] = useState(
    props.initialFirstNumber || 0
  );
  const [secondNumber, _setSecondNumber] = useState(
    props.initialSecondNumber || 0
  );
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [operationSelected, _setOperationSelected] = useState(
    props.initialOperationSelected || CalculatorOperation.ADD
  );
  const handleResultCalculation = useCallback(
    (
      firstNumber: number,
      secondNumber: number,
      operation: CalculatorOperation
    ) => {
      calculateResult(firstNumber, secondNumber, operation)
        .then((result) => {
          setErrorMessage("");
          setResult(result);
        })
        .catch((error) => {
          setErrorMessage(error);
          setResult(0);
        });
    },
    [setResult, setErrorMessage]
  );
  const setFirstNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      _setFirstNumber(Number(event.target.value));
      handleResultCalculation(
        Number(event.target.value),
        secondNumber,
        operationSelected
      );
    },
    [_setFirstNumber, secondNumber, operationSelected, handleResultCalculation]
  );
  const setSecondNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      _setSecondNumber(Number(event.target.value));
      handleResultCalculation(
        firstNumber,
        Number(event.target.value),
        operationSelected
      );
    },
    [_setSecondNumber, firstNumber, operationSelected, handleResultCalculation]
  );
  const setOperationSelected = useCallback(
    (event: CalculatorOperation) => {
      _setOperationSelected(event);
      handleResultCalculation(firstNumber, secondNumber, event);
    },
    [_setOperationSelected, firstNumber, secondNumber, handleResultCalculation]
  );
  useEffect(() => {
    handleResultCalculation(firstNumber, secondNumber, operationSelected);
  }, [firstNumber, secondNumber, operationSelected, handleResultCalculation]);
  return (
    <CalcultatorView
      firstNumber={firstNumber}
      onFirstNumberChange={setFirstNumber}
      secondNumber={secondNumber}
      onSecondNumberChange={setSecondNumber}
      operation={operationSelected}
      onOperationSelected={setOperationSelected}
      result={result}
      hasError={errorMessage}
    />
  );
}
