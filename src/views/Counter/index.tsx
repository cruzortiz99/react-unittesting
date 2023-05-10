import React, { useCallback, useState } from "react";
import {increaseCount, decreaseCount} from '../../services/Counter'

type CounterType = {
  initialValue?: number
}
function Counter(props:CounterType ): JSX.Element {
  const [count, setCount] = useState(props.initialValue || 0);
  const addCount = useCallback(() => setCount(increaseCount), [setCount])
  const reduceCount = useCallback(() => setCount(decreaseCount), [setCount])
  return (
    <div>
      <h3>Counter</h3>
      <p>Count: <span data-testid="count">{count}</span></p>
      <button data-testid="increase" onClick={addCount}>Add</button>
      <button data-testid="decrease" onClick={reduceCount}>Minus</button>
    </div>
  );
}
export default Counter
