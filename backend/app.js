require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js');
const path = require('path');
const app = express();
const db = require('dotenv');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});


mongoose.connect(process.env.DB_URI)


// mongoose.connect('mongodb+srv://Net:pourquoi@testbasededonne.ercrp.mongodb.net/test?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.log('Connexion à MongoDB échouée !');
    console.log(error)
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use("/api/", apiLimiter);
app.use(helmet());


app.use('/images', express.static(path.join(__dirname, 'images')));



app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;