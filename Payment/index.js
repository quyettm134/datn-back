const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('This is payments service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "Payment", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8085, console.log('Payments service listening on http://localhost:8085'))
    )
    .catch((error) => console.log(error.message));
