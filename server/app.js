const express = require('express');

const mongoose = require('mongoose');
const keys = require('./config/keys');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('mongodb connected'))
    .catch(e => console.log(e));

mongoose.set('useCreateIndex', true);

app.use(passport.initialize());
require('./middleware/passport')(passport);

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;