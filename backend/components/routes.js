//const personalController = require('./controllers/personal.js');
const usersController = require('./controllers/users');

module.exports = (app) => {
    app.post('/api/users/addUser', usersController.addUser);
    app.post('/api/users/sendPhone', usersController.sendPhone);
    /*app.post('/api/users/getUser');*/
}