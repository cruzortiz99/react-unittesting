import React from 'react'
import '../../assets/css/App.css';
import Counter from '../Counter';
import CounterWrong from '../Counter/WrongCounter';

function App() {
  return (
    <div className="App">
      <CounterWrong/>
      <Counter/>
    </div>
  );
}

export default App;
