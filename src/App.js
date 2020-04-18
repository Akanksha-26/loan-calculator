import React from 'react';
import './App.css';
import {calaculateLoanService} from './calculate-loan-service';

class App extends React.Component {
 constructor() {
   super();
   this.state = {
     amount: 0,
     time: 0,
     monthlyInsallment: 0,
   }
 }

  calculateMonthlyInstallment = async (amount, time) => {
    const data = await calaculateLoanService(amount, time);
    this.setState({
      monthlyInsallment: data.monthlyInstallment
    })
    console.log(data);
   
 }

  render () {
    const { amount, time, monthlyInsallment } = this.state;
    console.log(monthlyInsallment);
    return (
      <div className="App">
          <form className="calculatorForm">
            <div className="amountInput">
              <label htmlFor="amount">Amount</label>
              <input 
                type="number" 
                id="amount" 
                name="amount"
                onChange = {(event) =>this.setState({amount: event.target.value})}
                defaultValue = {amount}>
              </input>
            </div>
            <div className="durationInput">
              <label htmlFor="duration">Duration</label>
              <input 
                type="number" 
                id="duration" 
                name="duration"
                onChange = {(event) => this.setState({time: event.target.value})}
                defaultValue={time}
              >
              </input>
            </div>
            <input 
              className="submit-btn" 
              type="button" 
              value="OK" 
              onClick={() => this.calculateMonthlyInstallment(amount, time)}>
            </input>
          </form>
          <div className="result">
            <span>
               Monthly Installment: {monthlyInsallment}
            </span>
          </div>
      </div>
    );
  }  
}

export default App;
