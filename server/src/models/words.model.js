const word = require("./words.mongo");

const addNewWord = async (newWord) => {
  await word.findOneAndUpdate(
    {
      word: newWord.word
    },
    newWord,
    {
      upsert: true,
    }
  );
};

const randomizeWord = async () => {
  return await word.aggregate([
    {$sample: {size: 2}}
  ])
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
    randomizeWord,
    readWords,
    deleteWord,
    findWordByID
};
