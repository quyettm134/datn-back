const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const returnRoutes = require('./routes/returnRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/returns', returnRoutes);

app.get('/', (req, res) => {
    res.send('This is returns service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "Return", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8087, console.log('Returns service listening on http://localhost:8087'))
    )
    .catch((error) => console.log(error.message));
