import { fireEvent, render, screen } from "@testing-library/react"
import { CalculatorOperation, CalcultatorView, getCalculatorOperationFromString } from "../CalculatorView"

describe("Calculator View", () => {
  test("Should render as expected when the component is mounted", () => {
    const {container} = render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} />)
    expect(container).toMatchSnapshot()
  })
  test("Should show the value of firstNumber when is passed as props", async () => {
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} />)
    const firstNumberInput = await screen.findByTestId(/firstNumber/)
    expect(firstNumberInput.getAttribute('value')).toBe("10")
  })
  test("Should emit onFistNumberChange when first number input changes", async () => {
    const mockFn = jest.fn()
    render(<CalcultatorView firstNumber={10} secondNumber={10} operation={CalculatorOperation.ADD} result={20} onFirstNumberChange={mockFn} />)
    const firstNumberInput = await screen.findByTestId(/firstNumber/)
    fireEvent.change(firstNumberInput, {target: {value: '11'}})
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  test("Should show the value of secondNumber when is passed as props", async () => {
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} />)
    const secondNumberInput = await screen.findByTestId(/secondNumber/)
    expect(secondNumberInput.getAttribute('value')).toBe("15")
  })
  test("Should emit onSecondNumberChange when second number input changes", async () => {
    const mockFn = jest.fn()
    render(<CalcultatorView firstNumber={10} secondNumber={10} result={20} operation={CalculatorOperation.ADD} onSecondNumberChange={mockFn}/>)
    const secondInput = await screen.findByTestId(/secondNumber/)
    fireEvent.change(secondInput, {target: {value: "3"}})
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  test("Should show the value of result when is passed as props", async () => {
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} />)
    const resultNumber = await screen.findByTestId(/result/)
    expect(resultNumber.getAttribute('value')).toBe("90")
  })
  test("Should show message error when hasError is passed as props", async () =>{
    const testMessageError = "Test message error"
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} hasError={testMessageError} />)
    const messageError = await screen.findByTestId(/errorMessage/)
    expect(messageError.textContent).toBe(testMessageError)
  })
  test("Should hide result when hasError is passed as props", async () =>{
    const testMessageError = "Test message error"
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} hasError={testMessageError} />)
    const resultInput =  screen.queryByTestId(/result/)
    expect(resultInput).toBeFalsy()
  })
  test("Should show the correct value when the operation is passed as props", async () => {
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} />)
    const optionSelected: HTMLOptionElement = await screen.findByTestId(/option-multiply/)
    expect(optionSelected.selected).toBeTruthy()
    const optionUnselected: HTMLOptionElement = await screen.findByTestId(/option-add/)
    expect(optionUnselected.selected).toBeFalsy()
  })
  test("Should emit onOperationSelected when operation option changes", async () => {
    const mockFn = jest.fn()
    render(<CalcultatorView firstNumber={10} secondNumber={15} operation={CalculatorOperation.MULTIPLY} result={90} onOperationSelected={mockFn}/>)
    const selectOperation = await screen.findByTestId(/operation/)
    fireEvent.change(selectOperation, {target: { value: CalculatorOperation.SUB}})
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(CalculatorOperation.SUB)
  })
  test("Should get the right Calculator operation when the string is match", () => {
    Object.values(CalculatorOperation).forEach((value) => {
      const operation = getCalculatorOperationFromString(`${value}`.toLowerCase())
      expect(operation).toBe(value)
    })
  })
  test("Should get operation add when string does not match valid option", () => {
    const operation = getCalculatorOperationFromString("---")
    expect(operation).toBe(CalculatorOperation.ADD)
  })
})