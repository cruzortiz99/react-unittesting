
import React from 'react'

type CounterViewType = {
  count: number
  onIncrease: () => void
  onDecrease: () => void
  onMultiply: () => void
}
function CounterView(props:CounterViewType ): JSX.Element {
  return (
    <div>
      <h3>Counter</h3>
      <p>Count: <span data-testid="count">{props.count}</span></p>
      <button data-testid="increase" onClick={props.onIncrease}>Add</button>
      <button data-testid="decrease" onClick={props.onDecrease}>Minus</button>
      <button data-testid="multiply" onClick={props.onMultiply}>x 2</button>
    </div>
  );
}
export default CounterView