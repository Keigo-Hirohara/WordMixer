const {getAllIdeas, addNewIdea, updateIdea, deleteIdea} = require('../../models/ideas.model');

const httpGetAllIdeas = async (req, res) => {
    res.status(200).json(await getAllIdeas());
}

const httpAddNewIdea = async (req, res) => {
    const newIdea = req.body;
    if (!newIdea.idea) {
        return res.status(404).json({
            error: 'new idea is not defined!!'
        });
    }
    await addNewIdea(newIdea);
    return res.status(201).json(newIdea);
}

const httpUpdateIdea =  async (req, res) => {
    const newerIdea = req.body;
    
    await updateIdea(newerIdea, req.params.id)
    return res.status(201).json({
        ok: true
    })
}

const httpDeleteIdea = async (req, res) => {
    await deleteIdea(req.params.id)
    return res.status(200).json({
        ok: true
    })
}

module.exports = {httpGetAllIdeas, httpAddNewIdea, httpUpdateIdea, httpDeleteIdea};