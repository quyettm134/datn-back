const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('This is comments service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "Comment", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8083, console.log('Comments service listening on http://localhost:8083'))
    )
    .catch((error) => console.log(error.message));
