const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories);
});

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

app.put("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {title, url, techs} = req.body;

  if(!id){
    return res.status(400).json({msg: 'Invalid repository id'});
  }

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

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  if(!id){
    return res.status(400).json({msg: 'Invalid repository id'});
  }

  const repository = repositories.findIndex(rep => rep.id === id);

  if(repository < 0){
    return res.status(400).json({msg: 'Repository not found'});
  }

  repositories.splice(repository, 1);

  res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({msg: 'Invalid repository id'});
  }

  const repositoryIndex = repositories.findIndex(rep => rep.id === id);
  if(repositoryIndex < 0){
    return res.status(400).json({msg: 'Repository not found'});
  }

  repositories[repositoryIndex].likes += 1;
  return res.status(201).send({likes: repositories[repositoryIndex].likes});
});

module.exports = app;
