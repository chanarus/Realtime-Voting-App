const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://chanaru:chanaru@ds231658.mlab.com:31658/pushervote')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));