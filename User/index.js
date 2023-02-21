const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('This is users service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "User", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8080, console.log('Users service listening on http://localhost:8080'))
    )
    .catch((error) => console.log(error.message));
