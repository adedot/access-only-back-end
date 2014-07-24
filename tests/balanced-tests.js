// Balanced API Key
var balanced = require('balanced-official');

balanced.configure('ak-test-2gXhcfyZYyhyzYfnMfnr8yUjRkmis49qK');

// var card = balanced.marketplace.cards.create({
//     "expiration_month": "11", 
//     "cvv": "123", 
//     "number": "4111111111111111", 
//     "expiration_year": "2016"
// })

// var card = balanced.get('/cards/CC2cCvyDlTYFr89EUOFA64br')

// console.log(card.cards)

// balanced.get('/cards/CC2cCvyDlTYFr89EUOFA64br').debit({
//     "appears_on_statement_as": "Statement text", 
//     "amount": 1000, 
//     "description": "Some descriptive text for the debit in the dashboard"
// })
balanced.get('/cards/CC1WxCBFnnvnuNGwbISIqere');
balanced.get('/cards/CC1KfJ0c3zKau4BlncF1pGoB');
balanced.get('/cards/CC1js26jl8tG9LLX2NiigdH7');
balanced.get('/cards/CC12zbbvv37XQCf5GXdElynP');

console.log(balanced.marketplace.cards);