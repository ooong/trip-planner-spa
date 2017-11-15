const apiRouter = require('express').Router();

apiRouter.use('/hippos', require('./hippos'));
apiRouter.use('/country', require('./country'));

module.exports = apiRouter;
