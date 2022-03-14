const {getAllIdeas, addNewIdea, updateIdea, deleteIdea, existsIdeaWithId} = require('../../models/ideas.model');

const httpGetAllIdeas = async (req, res) => {
    res.status(200).json(await getAllIdeas());
}

const httpAddNewIdea = async (req, res) => {
    const newIdea = req.body;
    if (!newIdea.idea) {
        return res.status(400).json({
            error: 'new idea is not defined!!'
        });
    }
    await addNewIdea(newIdea);
    return res.status(201).json(newIdea);
}

const httpUpdateIdea =  async (req, res) => {
    const newerIdea = req.body;

    if (!newerIdea.idea || !newerIdea.desc) {
        res.status(400).json({
            error: 'error is not updated!'
        })
    }    
    await updateIdea(newerIdea, req.params.id)
    return res.status(201).json({
        ok: true
    })
}

const httpDeleteIdea = async (req, res) => {
    const ideaId = req.params.id;
    const existsIdea = await existsIdeaWithId(ideaId);

    if (!existsIdea) {
        return res.status(404).json({
            error: 'Idea not found'
        })
    }
    const deleted = await deleteIdea(ideaId);
    console.log(deleted)
    if (!deleted) {
        return res.status(400).json({
            error: 'Idea not aborted'
        })
    }

    return res.status(200).json({
        ok: true
    })
}



module.exports = {httpGetAllIdeas, httpAddNewIdea, httpUpdateIdea, httpDeleteIdea};