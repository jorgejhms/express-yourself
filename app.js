const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const {
    getElementById,
    getIndexById,
    updateElement,
    seedElements,
    createElement
} = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');

const PORT = process.env.PORT || 4001;

// Get all expressions
app.get('/expressions', (req, res, next) => {
    res.send(expressions);
})

// Get single expression
app.get('/expressions/:id', (req, res, next) => {
    const foundExpression = getElementById(req.params.id, expressions);

    if (foundExpression) {
        res.send(foundExpression);
    } else {
        res.status(404).send('Expression not found')
    }

})

// Update an expression
app.put('/expressions/:id', (req, res, next) => {
    const expressionsIndex = getIndexById(req.params.id, expressions);
    if (expressionsIndex !== -1) {
        updateElement(req.params.id, req.query, expressions);
        res.send(expressions[expressionsIndex]);
    } else {
        res.status(404).send();
    }
})

// Create a new expression
app.post('/expressions', (req, res, next) => {
    const receivedExpression = createElement('expressions', req.query);

    if (receivedExpression) {
        expressions.push(receivedExpression);
        res.status(201).send(receivedExpression);
    } else {
        res.status(400).send();
    }
})

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})