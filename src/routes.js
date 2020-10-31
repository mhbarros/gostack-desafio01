const {Router} = require('express');
const RepositoryController = require('./controller/RepositoryController');
const LikeController = require('./controller/LikeController');

const {validateUUID: validateUUIDMiddleware} = require("./validator/uuid");

const repositoryController = new RepositoryController();
const likeController       = new LikeController();

const routes = Router();

routes.get("/repositories", repositoryController.list)
routes.get('/repositories/:id', validateUUIDMiddleware, repositoryController.index)

routes.post('/repositories', repositoryController.create)
routes.post('/repositories/:id/like', validateUUIDMiddleware, likeController.create)

routes.put('/repositories/:id', validateUUIDMiddleware, repositoryController.update)
routes.delete('/repositories/:id', validateUUIDMiddleware, repositoryController.delete)

module.exports = routes;