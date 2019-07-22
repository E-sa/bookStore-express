module.exports = (app) => {
  app.use('/api/v1/auth', require('./user.route'));
  app.use('/api/v1/book', require('./book.route'));
  app.use('/api/v1/buy', require('./buy.route'));


}
