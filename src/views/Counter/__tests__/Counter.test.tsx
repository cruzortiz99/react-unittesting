import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Counter from "..";
import { increaseCount, decreaseCount, multiplyCount } from "../../../services/Counter";
jest.mock("../../../services/Counter", () => ({
  __esModule: true,
  ...jest.requireActual('../../../services/Counter'),
  increaseCount: jest.fn(() => 123),
  decreaseCount: jest.fn(() => -123),
  multiplyCount: jest.fn(() => Promise.resolve(72))
}));

afterEach(() => {
 cleanup()
});

describe("Counter component", () => {
  test("Should render initial state when is passed as props", async () => {
    const initialState = 545;
    render(<Counter initialValue={initialState} />);
    const countElement = await screen.findByTestId(/count/);
    expect(countElement.textContent).toBe(`${initialState}`);
  });
  test("Should call increase service when add button is called", async () => {
    render(<Counter initialValue={35}/>);
    const addButton = await screen.findByTestId(/increase/);
    fireEvent.click(addButton);
    expect(increaseCount).toHaveBeenCalledTimes(1);
    expect(increaseCount).toHaveBeenCalledWith(35)
  });
  test("Should render result of increase when is called", async () => {
    render(<Counter />);
    const addButton = await screen.findByTestId(/increase/);
    fireEvent.click(addButton);
    const countElement = await screen.findByTestId(/count/);
    expect(countElement.textContent).toBe(`${123}`);
  });
  test("Should call decrease service when minus button is called", async () => {
    render(<Counter initialValue={12}/>);
    const decreaseButton = await screen.findByTestId(/decrease/);
    fireEvent.click(decreaseButton);
    expect(decreaseCount).toHaveBeenCalledTimes(1);
    expect(decreaseCount).toHaveBeenCalledWith(12)
  });
  test("Should render result of decrease when is called", async () => {
    render(<Counter />);
    const decreaseButton = await screen.findByTestId(/decrease/);
    fireEvent.click(decreaseButton);
    const countElement = await screen.findByTestId(/count/);
    expect(countElement.textContent).toBe(`${-123}`);
  });
  test("Should call multiply when is x2 button is clicked", async () => {
    render(<Counter initialValue={36}/>)
    const multiplyButton = await screen.findByTestId(/multiply/)
    fireEvent.click(multiplyButton)
    await waitFor(() => expect(multiplyCount).toHaveBeenCalledTimes(1))
  })
  test("Should render multiply result when function call resolve", async () => {
    render(<Counter initialValue={36}/>)
    const multiplyButton = await screen.findByTestId(/multiply/)
    fireEvent.click(multiplyButton)
    const count = await screen.findByTestId(/count/)
    await waitFor(() => expect(count.textContent).toBe("72"))
  })
});
