const express = require('express');
const {
    seedElements,
    getElementById,
    createElement,
    updateElement,
    getIndexById
} = require('./utils');
const expressionsRouter = express.Router();

const expressions = [];
seedElements(expressions, 'expressions');

// Get all expressions
expressionsRouter.get('/', (req, res, next) => {
    res.send(expressions);
})

// Get single expression
expressionsRouter.get('/:id', (req, res, next) => {
    const foundExpression = getElementById(req.params.id, expressions);

    if (foundExpression) {
        res.send(foundExpression);
    } else {
        res.status(404).send('Expression not found')
    }

})

// Update an expression
expressionsRouter.put('/:id', (req, res, next) => {
    const expressionsIndex = getIndexById(req.params.id, expressions);
    if (expressionsIndex !== -1) {
        updateElement(req.params.id, req.query, expressions);
        res.send(expressions[expressionsIndex]);
    } else {
        res.status(404).send();
    }
})

// Create a new expression
expressionsRouter.post('/', (req, res, next) => {
    const receivedExpression = createElement('expressions', req.query);

    if (receivedExpression) {
        expressions.push(receivedExpression);
        res.status(201).send(receivedExpression);
    } else {
        res.status(400).send();
    }
})

// Delete an expression
expressionsRouter.delete('/:id', (req, res, next) => {
    const expressionToDelete = getIndexById(req.params.id, expressions);
    if (expressionToDelete !== -1) {
        expressions.splice(expressionToDelete, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = expressionsRouter;