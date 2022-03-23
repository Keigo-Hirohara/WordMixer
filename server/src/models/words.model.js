const word = require("./words.mongo");

const addNewWord = async (newWord, userId) => {
  await word.findOneAndUpdate(
    {
      word: newWord.word,
      userId: userId
    }, {
      word: newWord.word,
      userId: userId
    }
    ,
    {
      upsert: true,
    }
  );
};

const readWords = async (userId) => {
    return await word.find({
      userId
    }, {
      '__v': 0
    }).sort({ $natural: -1 });
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
