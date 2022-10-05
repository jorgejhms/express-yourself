const express = require('express');
const animalsRouter = require('./animals.js');
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

app.use('/expressions', expressionsRouter);
app.use('/animals', animalsRouter);

const PORT = process.env.PORT || 4001;

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})