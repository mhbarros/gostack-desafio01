const repositories = require('../db/repositories');
const { v4: uuid } = require('uuid');

class RepositoryController {
    index(req, res){
        const {id} = req.params;

        const repository = repositories.find(rep => rep.id === id);
        if(!repository){
            return res.status(400).json({msg: 'Repository not found'});
        }

        return res.json(repository);
    }

    list(req, res){
        res.json(repositories);
    }

    create(req, res){
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
    }

    update(req, res){
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
    }

    delete(req, res){
        const {id} = req.params;

        const repository = repositories.findIndex(rep => rep.id === id);

        if(repository < 0){
            return res.status(400).json({msg: 'Repository not found'});
        }

        repositories.splice(repository, 1);

        res.status(204).send();
    }
}

module.exports = RepositoryController;