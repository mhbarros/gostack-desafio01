const express      = require("express");
const cors         = require("cors");
const { v4: uuid } = require('uuid');

const {validateUUID: validateUUIDMiddleware} = require("./validator/uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories);
});

app.get("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const repository = repositories.find(rep => rep.id === id);
  if(!repository){
    return res.status(400).json({msg: 'Repository not found'});
  }

  return res.json(repository);
})

app.post("/repositories", (req, res) => {
  const {title, url, techs} = req.body;
  const newId = uuid();

  const newRepository = {
    id: newId,
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository);

  res.json(newRepository);
});

app.put("/repositories/:id", validateUUIDMiddleware, (req, res) => {
  const {id} = req.params;
  const {title, url, techs} = req.body;

  const newRepository = {
    id,
    title,
    url,
    techs
  }

  const oldRepositoryIndex = repositories.findIndex(rep => rep.id === id);
  if(oldRepositoryIndex < 0){
    return res.status(400).json({msg: 'Repository not found.'});
  }

  const oldRepository = repositories[oldRepositoryIndex];

  newRepository.likes = oldRepository.likes;

  repositories[oldRepositoryIndex] = newRepository;

  res.json(newRepository);
});

app.delete("/repositories/:id", validateUUIDMiddleware, (req, res) => {
  const {id} = req.params;

  const repository = repositories.findIndex(rep => rep.id === id);

  if(repository < 0){
    return res.status(400).json({msg: 'Repository not found'});
  }

  repositories.splice(repository, 1);

  res.status(204).send();
});

app.post("/repositories/:id/like", validateUUIDMiddleware, (req, res) => {
  const {id} = req.params;

  const repositoryIndex = repositories.findIndex(rep => rep.id === id);
  if(repositoryIndex < 0){
    return res.status(400).json({msg: 'Repository not found'});
  }

  repositories[repositoryIndex].likes += 1;
  return res.status(201).send({likes: repositories[repositoryIndex].likes});
});

module.exports = app;
