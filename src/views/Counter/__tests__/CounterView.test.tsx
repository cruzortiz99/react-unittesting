import { fireEvent, render, screen } from "@testing-library/react"
import CounterView from "../CounterView"

describe('Counter view', () => {
  test('Should render the count when is passed through props', async () => {
    render(<CounterView count={46} onIncrease={jest.fn} onDecrease={jest.fn} onMultiply={jest.fn()}/>)
    const count = await screen.findByTestId(/count/)
    expect(count.textContent).toBe("46")
  })
  test("Should emit onIncrease event when add button is clicked", async () => {
    const mockFn = jest.fn()
    render(<CounterView count={0} onIncrease={mockFn} onDecrease={jest.fn()} onMultiply={jest.fn()} />)
    const addButton = await screen.findByTestId(/increase/)
    fireEvent.click(addButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  test("Should emit onDecrease event when decrease button is clicked", async () => {
    const mockFn = jest.fn()
    render(<CounterView count={0} onIncrease={jest.fn()} onDecrease={mockFn} onMultiply={jest.fn()}/>)
    const decreaseButton = await screen.findByTestId(/decrease/)
    fireEvent.click(decreaseButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  test("Should emit onMultiply event when multiply button is clicked", async () => {
    const mockFn = jest.fn()
    render(<CounterView count={0} onIncrease={jest.fn()} onDecrease={jest.fn()} onMultiply={mockFn}/>)
    const multiplyButton = await screen.findByTestId(/multiply/)
    fireEvent.click(multiplyButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test("It should render render as expected when component is mounted", () => {
    const { container } = render(<CounterView count={10} onIncrease={jest.fn()} onDecrease={jest.fn()} onMultiply={jest.fn()}/>)
    expect(container).toMatchSnapshot()
  })
})