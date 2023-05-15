import React, { useCallback, useState } from 'react'

function CounterWrong(): JSX.Element {
  const [count, setCount] = useState(0);
  const addCount = useCallback(() => {
    // ... 
    setCount(prev => prev + 1)}, [setCount])
  const reduceCount = useCallback(() => setCount(prev => prev - 1), [setCount])
  return (
    <div>
      <h3>Wrong Counter</h3>
      <p>Count: <span data-testid="count">{count}</span></p>
      <button data-testid="add" onClick={addCount}>+1</button>
      <button data-testid="minus" onClick={reduceCount}>-1</button>
    </div>
  );
}
export default CounterWrong