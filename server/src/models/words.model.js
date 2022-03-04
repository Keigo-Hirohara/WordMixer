const word = require("./words.mongo");

const addNewWord = async (newWord) => {
  await word.findOneAndUpdate(
    {
      _id: newWord._id
    },
    newWord,
    {
      upsert: true,
    }
  );
};

const readWords = async () => {
    return await word.find({}, {
      '__v': 0
    });
}

const deleteWord = async (selectedId) => {

  return await word.findOneAndDelete({
    _id: selectedId
  });
}

const findWordByID = async (findId) => {
  return await word.findOne({_id: findId});
}

module.exports = {
    addNewWord,
    readWords,
    deleteWord,
    findWordByID
};
