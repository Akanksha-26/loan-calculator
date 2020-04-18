export class CalaculateLoanService {
    async calculate(amount, time) {
        const response = await fetch("http://www.mocky.io/v2/5e9b6b623300006100bf1798", {
            method: 'POST',
            body: {
                amount: amount,
                duration: time
            }
        })
        return response.json();
    }
}

