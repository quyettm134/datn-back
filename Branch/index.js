const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const branchRoutes = require('./routes/branchRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/branches', branchRoutes);

app.get('/', (req, res) => {
    res.send('This is branches service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "Branch", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8082, console.log('Orders service listening on http://localhost:8082'))
    )
    .catch((error) => console.log(error.message));
