import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Counter from "..";
import { increaseCount, decreaseCount } from "../../../services/Counter";
jest.mock("../../../services/Counter", () => ({
  __esModule: true,
  ...jest.requireActual('../../../services/Counter'),
  increaseCount: jest.fn(() => 123),
  decreaseCount: jest.fn(() => -123),
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
    render(<Counter />);
    const addButton = await screen.findByTestId(/increase/);
    fireEvent.click(addButton);
    expect(increaseCount).toHaveBeenCalledTimes(1);
  });
  test("Should render result of increase when is called", async () => {
    render(<Counter />);
    const addButton = await screen.findByTestId(/increase/);
    fireEvent.click(addButton);
    const countElement = await screen.findByTestId(/count/);
    expect(countElement.textContent).toBe(`${123}`);
  });
  test("Should call decrease service when minus button is called", async () => {
    render(<Counter />);
    const decreaseButton = await screen.findByTestId(/decrease/);
    fireEvent.click(decreaseButton);
    expect(decreaseCount).toHaveBeenCalledTimes(1);
  });
  test("Should render result of decrease when is called", async () => {
    render(<Counter />);
    const decreaseButton = await screen.findByTestId(/decrease/);
    fireEvent.click(decreaseButton);
    const countElement = await screen.findByTestId(/count/);
    expect(countElement.textContent).toBe(`${-123}`);
  });
});
