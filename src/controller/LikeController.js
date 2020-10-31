const repositories = require('../db/repositories');

class LikeController {
    create(req, res){
        const {id} = req.params;

        const repositoryIndex = repositories.findIndex(rep => rep.id === id);
        if(repositoryIndex < 0){
            return res.status(400).json({msg: 'Repository not found'});
        }

        repositories[repositoryIndex].likes += 1;
        return res.status(201).send({likes: repositories[repositoryIndex].likes});
    }
}

module.exports = LikeController;