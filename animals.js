const express = require('express');
const {
    seedElements,
    getElementById,
    createElement,
    updateElement,
    getIndexById
} = require('./utils');
const animalsRouter = express.Router();

const animals = [];
seedElements(animals, 'animals');

animalsRouter.get('/', (req, res, next) => {
    res.send(animals);
})

animalsRouter.get('/:id', (req, res, next) => {
    const foundAnimal = getElementById(req.params.id, animals);

    if (foundAnimal) {
        res.send(foundAnimal);
    } else {
        res.status(404).send('Animal not found');
    }
})

animalsRouter.put('/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.status(404).send();
    }
})

animalsRouter.post('/', (req, res, next) => {
    const receivedAnimal = createElement('animals', req.query);

    if (receivedAnimal) {
        animals.push(receivedAnimal);
        res.status(201).send(receivedAnimal);
    } else {
        res.status(400).send();
    }
})

animalsRouter.delete('/:id', (req, res, next) => {
    const animalToDelete = getIndexById(req.params.id, animals);
    if (animalToDelete !== -1) {
        animals.splice(animalToDelete, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = animalsRouter;