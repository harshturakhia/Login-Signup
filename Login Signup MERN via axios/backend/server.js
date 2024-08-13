require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


require('./db.js');
const authRoutes = require('./routes/AuthRoutes.js')
const productRoutes = require('./routes/ProductRoutes.js')

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

app.listen(process.env.PORT ? process.env.PORT : 9898, () => {
    console.log("http://localhost:9898")
})
