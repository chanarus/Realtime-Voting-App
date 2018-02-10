const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const voteRoutes = require('./routes/vote-routes');
const port = 3000;

const app = express();

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Unable CORS
app.use(cors());

//Set Routes
app.use('/vote', voteRoutes);

//Start the server
app.listen(port, () => console.log(`App is running on port ${port}`));