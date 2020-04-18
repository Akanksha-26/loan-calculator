import React from 'react';
import { render, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';
import App from './App';


class fakeService {
  calculate(amount, time) {
    return new Promise({"monthlyInstallment":"5390.61"})
  }
}

const calaculateLoanService = new fakeService()

test('renders learn react link', () => {
  const { getByTestId  } = render(<App calaculateLoanService={calaculateLoanService}/>);

  const durationInput = getByTestId("duration");
  expect(durationInput).toBeInTheDocument();

  const amountInput = getByTestId("amount");
  expect(amountInput).toBeInTheDocument();

  const submitBtn = getByTestId("submit-btn");
  expect(submitBtn).toBeInTheDocument();
});

test('should not submit the form if amount or duration validation fails', () => {
  const spy = jest.fn().mockResolvedValue(
    {"monthlyInstallment":"5390.61"}
  );
  const { getByTestId  } = render(<App calaculateLoanService={spy}/>);

  const durationInput = getByTestId("duration");
  const amountInput = getByTestId("amount");

  fireEvent.change(durationInput, { target: { value: '23' } });
  fireEvent.change(amountInput, { target: { value: '3' } });
  expect(spy).not.toHaveBeenCalled();

  fireEvent.change(amountInput, { target: { value: '10000' } });
  fireEvent.change(durationInput, { target: { value: '50' } });
  expect(spy).not.toHaveBeenCalled();
});

test('should show error when there was error calculating installment', async() =>{
  const spy = {
    calculate: jest.fn().mockRejectedValue(new Error("oh no"))
  }
  const { container, getByTestId  } = render(<App calaculateLoanService={spy}/>);
  const durationInput = getByTestId("duration");
  const amountInput = getByTestId("amount");
  const calculatorForm = getByTestId("calculatorForm");
  fireEvent.change(amountInput, { target: { value: '10000' } });
  fireEvent.change(durationInput, { target: { value: '3' } });
  fireEvent.submit(calculatorForm);
  
  expect(spy.calculate).toHaveBeenCalled();

  await waitForDomChange({ container })
  const error = getByTestId("error-message");
  expect(error).toBeInTheDocument();
});


test('should render result when form was submitted successfully', async() => {
  const spy = {
    calculate: jest.fn().mockResolvedValue({"monthlyInstallment":"5000"})
  }
  const { container, getByTestId  } = render(<App calaculateLoanService={spy}/>);
  const durationInput = getByTestId("duration");
  const amountInput = getByTestId("amount");
  const calculatorForm = getByTestId("calculatorForm");
  fireEvent.change(amountInput, { target: { value: '10000' } });
  fireEvent.change(durationInput, { target: { value: '3' } });
  fireEvent.submit(calculatorForm);
  
  expect(spy.calculate).toHaveBeenCalled();

  await waitForDomChange({ container })
  const result = getByTestId("result");
  expect(result).toBeInTheDocument();
  expect(result.textContent).toEqual("Monthly Installment: 5000");
})
