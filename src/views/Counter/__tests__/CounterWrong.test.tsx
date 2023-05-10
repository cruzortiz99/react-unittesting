import CounterWrong from "../WrongCounter";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

describe("CounterWrong component", () => {
  afterEach(() => cleanup());
  test("Should have 0 as default value when start render", async () => {
    const { container } = render(<CounterWrong />);
    const defaultValueExpected = await screen.findByText(/0/);
    expect(defaultValueExpected).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test("Should add 1 to the count when add button is clicked", async () => {
    const { container } = render(<CounterWrong />);
    const button = await screen.findByText("Add");
    fireEvent.click(button);
    const count = await screen.findByText(/1/);
    expect(count).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test("Should show the correct sum when the add button is clicked several times", async () => {
    await [3,15,1000].map((times) => async () => {
      render(<CounterWrong />);
      const button = await screen.findByText("Add");
      const total = times;
      for(let i = 0; i < times; i++) {
        fireEvent.click(button)
      }
      const count = await screen.findByText(RegExp(`${total}`));
      expect(count).toBeTruthy();
      cleanup()
    }).reduce((prevTest, currentTest) => prevTest.then(() => currentTest()), Promise.resolve())
  });
  test("Should reduce 1 to the count when minus button is clicked", async () => {
    const { container } = render(<CounterWrong />);
    const button = await screen.findByText("Minus");
    fireEvent.click(button);
    const count = await screen.findByText(/-1/);
    expect(count).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test("Should show the correct count when the minus button is clicked several times", async () => {
    await [3,15,1000].map((times) => async () => {
      render(<CounterWrong />);
      const button = await screen.findByText("Minus");
      const total = 0 - times;
      for(let i = 0; i < times; i++) {
        fireEvent.click(button)
      }
      const count = await screen.findByText(RegExp(`${total}`));
      expect(count).toBeTruthy();
      cleanup()
    }).reduce((prevTest, currentTest) => prevTest.then(() => currentTest()), Promise.resolve())
  });
});
