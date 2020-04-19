import React from 'react';
import './App.css';

class App extends React.Component {
 constructor() {
   super();
   this.state = {
     amount: 0,
     time: 0,
     monthlyInsallment: "",
     error: false
   }
 }


  handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const data = await this.props.calaculateLoanService.calculate(this.state.amount, this.state.time);
      this.setState({
        monthlyInsallment: data.monthlyInstallment,
        error: false
      })
    } catch(e) {
      this.setState({
        error: true
      });
    }
    
 }

  render () {
    const { amount, time, monthlyInsallment } = this.state;
    return (
      <div className="App">
          <form data-testid="calculatorForm" className="calculatorForm" onSubmit={this.handleSubmit}>
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
            {!this.state.error && <span data-testid="result">
               Monthly Installment: {monthlyInsallment}
            </span>}
            {this.state.error && <span data-testid="error-message">
                Error encountered while calculating monthly installment, please try again later.
            </span>}
          </div>
      </div>
    );
  }  
}

export default App;
