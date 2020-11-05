const express = require('Express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const api = require('./api');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);

app.listen(3001);