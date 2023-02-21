const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const discountRoutes = require('./routes/discountRoutes');
const voucherRoutes = require('./routes/voucherRoutes');

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/discounts', discountRoutes);
app.use('/vouchers', voucherRoutes);

app.get('/', (req, res) => {
    res.send('This is discounts service');
});


const CONNECTION_URL = 'mongodb+srv://kqq:kqq123456@kqqservice.bhzyiuy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {dbName: "Discount", useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        app.listen(8084, console.log('Discounts service listening on http://localhost:8084'))
    )
    .catch((error) => console.log(error.message));
