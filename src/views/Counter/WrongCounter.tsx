import React, { useCallback, useState } from 'react'

function CounterWrong(): JSX.Element {
  const [count, setCount] = useState(0);
  const addCount = useCallback(() => setCount(prev => prev + 1), [setCount])
  const reduceCount = useCallback(() => setCount(prev => prev - 1), [setCount])
  return (
    <div>
      <h3>Wrong Counter</h3>
      <p>Count: {count}</p>
      <button onClick={addCount}>Add</button>
      <button onClick={reduceCount}>Minus</button>
    </div>
  );
}
export default CounterWrong