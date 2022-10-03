const express = require('express');
const app = express();
const { seedElements } = require('./utils');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const expressions = [];
seedElements(expressions, 'expressions');

app.get('/expressions', (req, res, next) => {
    res.send(expressions);
})

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})