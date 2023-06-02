import { cleanup, render, screen } from "@testing-library/react";
import { CalculatorOperation, ICalculatorView } from "../CalculatorView";
import { Calcultator } from "..";

jest.mock("../CalculatorView", () => {
  const originalModule = jest.requireActual("../CalculatorView");
  return {
    ...originalModule,
    CalculatorView: jest.fn((props: ICalculatorView) => (
      <>
        <input
          data-testid="firstNumber"
          value={props.firstNumber}
          onChange={props.onFirstNumberChange}
        />
        <input
          data-testid="secondNumber"
          value={props.secondNumber}
          onChange={props.onSecondNumberChange}
        />
        <input
          data-testid="operation"
          value={props.operation}
          onChange={() =>
            props.onOperationSelected &&
            props.onOperationSelected(originalModule.CalculatorOperation.ADD)
          }
        />
        <input data-testid="result" value={props.result} />
      </>
    )),
  };
});

describe("Calculator", () => {
  test("Should show first number as expected when is passed throw props", async () => {
    await [-10, -1, 0, 1, 10]
      .map(async (expectedValue) => {
        cleanup()
        render(<Calcultator initialFirstNumber={expectedValue} />);
        const firstNumberInput: HTMLInputElement = await screen.findByTestId(
          /firstNumber/
        );
        expect(firstNumberInput.value).toBe(`${expectedValue}`);
      })
      .reduce((acc, unitCase) => acc.then(() => unitCase), Promise.resolve());
  });
  test("Should show second number as expected when is passed throw props", async () => {
    await [-10, -1, 0, 1, 10]
    .map(async (expectedValue) => {
      cleanup()
      render(<Calcultator initialSecondNumber={expectedValue} />);
      const secondNumberInput: HTMLInputElement = await screen.findByTestId(
        /secondNumber/
      );
      expect(secondNumberInput.value).toBe(`${expectedValue}`);
    })
    .reduce((acc, unitCase) => acc.then(() => unitCase), Promise.resolve());
  });
  test("Should show operation as expected when is passed throw props", async () => {
    await [CalculatorOperation.ADD, CalculatorOperation.DIVISION, CalculatorOperation.MULTIPLY, CalculatorOperation.SUB]
    .map(async (expectedValue) => {
      cleanup()
      render(<Calcultator initialOperationSelected={expectedValue} />);
      const operationInput: HTMLInputElement = await screen.findByTestId(
        /operation/
      );
      expect(operationInput.value).toBe(`${expectedValue}`);
    })
    .reduce((acc, unitCase) => acc.then(() => unitCase), Promise.resolve());
  });
  test.skip("Should call calculator service to add first number and second number when operation add is selected", () => {});
  test.skip("Should call calculator service to sub firstNumber and secondNumber when operation sub is selected", () => {});
  test.skip("Should call calculator service to multiply firstNumber and secondNumber when operation multiply is selected", () => {});
  test.skip("Should call calculator service to div firstNumber and secondNumber when operation div is selected", () => {});
  test.skip("Should show error when calculator service is called with operation dov and second number is zero 0", () => {});
  test.skip("Should first number change correctly when onFirstNumberChange is emitted", () => {});
  test.skip("Should second number change correctly when onSecondNumberChange is emitted", () => {});
  test.skip("Should operation change correctly when onOperationSelected is emitted", () => {});
});
