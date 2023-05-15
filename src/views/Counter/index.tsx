import React, { SetStateAction, useCallback, useState } from "react";
import {
  increaseCount,
  decreaseCount,
  multiplyCount,
} from "../../services/Counter";
import CounterView from "./CounterView";

type CounterType = {
  initialValue?: number;
};
// OOP Design Patterns: Mediator 
function Counter(props: CounterType): JSX.Element {
  const [count, setCount] = useState(props.initialValue || 0);
  const addCount = useCallback(() => setCount(increaseCount), [setCount]);
  const reduceCount = useCallback(() => setCount(decreaseCount), [setCount]);
  const multiply = useCallback(
    (count: number, setFn: React.Dispatch<SetStateAction<number>>) => () =>
      multiplyCount(count, 2).then((result) => setFn(result)),
    []
  );
  return (
    <CounterView
      count={count}
      onIncrease={addCount}
      onDecrease={reduceCount}
      onMultiply={multiply(count, setCount)}
    />
  );
}
export default Counter;
