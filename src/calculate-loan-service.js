export class CalaculateLoanService {
    async calculate(amount, time) {
        const response = await fetch("https://www.mocky.io/v2/5e9c972530000059000a7f0a", {
            method: 'POST',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: {
                amount: amount,
                duration: time
            }
        })
        return response.json();
    }
}

