const usersController = require('./controllers/users');

module.exports = (app) => {
    app.post('/api/users/addUser', usersController.addUser); // добавление пользователя
    app.post('/api/users/recovery', usersController.recovery); // восстановить номер телефона
    app.post('/api/users/findUser', usersController.findUser); // найти пользователя по почте и номеру телефона
}