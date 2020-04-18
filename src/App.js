import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <form className="calculatorForm">
          <div className="amountInput">
            <label for="amount">Amount</label>
            <input type="text" id="amount" name="amoun"></input>
          </div>
          <div className="durationInput">
            <label for="duration">Duration</label>
            <input type="text" id="duration" name="duration"></input>
          </div>
          <input className="submit" type="submit" value="OK"></input>
        </form>
        <div className="result">
          <span>
             Monthly Installment: 
          </span>
        </div>
    </div>
  );
}

export default App;
