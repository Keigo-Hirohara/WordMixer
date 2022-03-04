const idea = require("./ideas.mongo");

const getAllIdeas = async () => {
  return await idea.find(
    {},
    {
      __v: 0,
    }
  );
};

const addNewIdea = async (newIdea) => {
    await idea.findOneAndUpdate({
        idea: newIdea.idea,
    }, newIdea, {
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
    const deleteId = ideaId;
    await idea.findOneAndDelete({
        _id: deleteId
    })
}

module.exports = {getAllIdeas, addNewIdea, updateIdea, deleteIdea};