const MessageController = require('../controllers/message.controller');

module.exports = app => {
    app.post('/api/newMessage', MessageController.newMessage)
}