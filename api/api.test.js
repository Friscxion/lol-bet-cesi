const fetch = require('node-fetch');

describe('Parties', () => {
    test('GET all', () => {
        fetch("http://localhost:3002/parties")
            .then(response => expect(response.status).toBe(200))
    });
});

describe('Teams', () => {
    test('GET all', () => {
        fetch("http://localhost:3002/teams")
            .then(response => expect(response.status).toBe(200))
    });
});

describe('Tickets', () => {
    test('GET all', () => {
        fetch("http://localhost:3002/tickets")
            .then(response => expect(response.status).toBe(200))
    });
    test('PUT create failed : empty body', () => {
        fetch("http://localhost:3002/tickets", {method: "PUT", body: JSON.stringify({})})
            .then(response => expect(response.status).toBe(404))
    });
    test('PUT create failed : party doesnt exist', () => {
        fetch("http://localhost:3002/tickets", {
            method: "PUT",
            body: JSON.stringify({party_id: 2, bet: 2, pronostic: 2})
        })
            .then(response => expect(response.status).toBe(404))
    });
    test('PUT create failed : miss data', () => {
        fetch("http://localhost:3002/tickets", {method: "PUT", body: JSON.stringify({party_id: 2, bet: 2})})
            .then(response => expect(response.status).toBe(404))
    });
})

describe('Bets', () => {
    test('GET by Ticket ID', () => {
        fetch("http://localhost:3002/bets/id/5")
            .then(response=>expect(response.status).toBe(200))
    });
    test('PUT create failed : empty body', () => {
        fetch("http://localhost:3002/bets",{method:"PUT",body:JSON.stringify({})})
            .then(response=>expect(response.status).toBe(404))
    });
})
