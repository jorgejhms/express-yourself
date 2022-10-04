const express = require('express');
const app = express();
const expressionsRouter = require('./expressions.js');

// Serves Express Yourself website
app.use(express.static('public'));

const {
    getElementById,
    getIndexById,
    updateElement,
    seedElements,
    createElement
} = require('./utils');

const animals = [];
seedElements(animals, 'animals');

app.use('/expressions', expressionsRouter);

const PORT = process.env.PORT || 4001;

// Animals

app.get('/animals', (req, res, next) => {
    res.send(animals);
})

app.get('/animals/:id', (req, res, next) => {
    const foundAnimal = getElementById(req.params.id, animals);

    if (foundAnimal) {
        res.send(foundAnimal);
    } else {
        res.status(404).send('Animal not found');
    }
})

app.put('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.status(404).send();
    }
})

app.post('/animals', (req, res, next) => {
    const receivedAnimal = createElement('animals', req.query);

    if (receivedAnimal) {
        animals.push(receivedAnimal);
        res.status(201).send(receivedAnimal);
    } else {
        res.status(400).send();
    }
})

app.delete('/animals/:id', (req, res, next) => {
    const animalToDelete = getIndexById(req.params.id, animals);
    if (animalToDelete !== -1) {
        animals.splice(animalToDelete, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})