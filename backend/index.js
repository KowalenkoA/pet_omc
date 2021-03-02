
const express = require('express');
const app = express();
const cors = require('cors');

const serverPort = 4000;

app.use(express.json());
app.use(cors())

require('./components/routes.js')(app);

app.listen(serverPort, function() {
    console.log('BACKEND RUNNING ON PORT: ' + serverPort);
});
