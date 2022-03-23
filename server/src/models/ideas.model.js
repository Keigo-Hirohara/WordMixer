const idea = require("./ideas.mongo");

const getAllIdeas = async (userId) => {
  return await idea.find(
    {userId},
    {
      __v: 0,
    }
  ).sort({ $natural: -1 });
};

const addNewIdea = async (newIdea, userId) => {
    await idea.findOneAndUpdate({
        idea: newIdea.idea,
        userId
    }, {
        $setOnInsert: {
            idea: newIdea.idea,
            desc: newIdea.desc,
            userId
        }
    }, {
        upsert: true
    })
};

const updateIdea = async (newerIdea, ideaId) => {
    const updatedIdea = newerIdea;
    const updated = await idea.findOneAndUpdate({
        _id: ideaId
    }, newerIdea);
}

const deleteIdea = async (ideaId) => {
    return await idea.findOneAndDelete({
        _id: ideaId
    })
}

const existsIdeaWithId = async (ideaId) => {
    return await idea.findOne({
        _id: ideaId
    }) 
}

module.exports = {getAllIdeas, addNewIdea, updateIdea, deleteIdea, existsIdeaWithId};