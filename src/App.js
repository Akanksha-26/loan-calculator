import React from 'react';
import './App.css';
import {calaculateLoanService} from './calculate-loan-service';

class App extends React.Component {
 constructor() {
   super();
   this.state = {
     amount: 0,
     time: 0,
     monthlyInsallment: "",
   }
 }


  handleSubmit = async (event) => {
    event.preventDefault();
    const data = await calaculateLoanService(this.state.amount, this.state.time);
    this.setState({
      monthlyInsallment: data.monthlyInstallment
    })
 }

  render () {
    const { amount, time, monthlyInsallment } = this.state;
    console.log(monthlyInsallment);
    return (
      <div className="App">
          <form className="calculatorForm" onSubmit={this.handleSubmit}>
            <div className="amountInput">
              <label htmlFor="amount">Amount</label>
              <input 
                type="number" 
                data-testid = "amount"
                min="10000"
                max="100000"
                name="amount"
                onChange = {(event) =>this.setState({amount: event.target.value})}
                defaultValue = {amount}>
              </input>
            </div>
            <div className="durationInput">
              <label htmlFor="duration">Duration</label>
              <input 
                type="number" 
                data-testid="duration"
                min="1"
                max="5"
                name="duration"
                onChange = {(event) => this.setState({time: event.target.value})}
                defaultValue={time}
              >
              </input>
            </div>
            <input 
              className="submit-btn" 
              type="submit" 
              data-testid="submit-btn"
              value="OK">
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
