const {
  addNewWord,
  readWords,
  deleteWord,
  findWordByID,
} = require("../../models/words.model");

const httpAddNewWord = async (req, res) => {
  const word = req.body;
  console.log(`created by: ${JSON.stringify(req.user)}`);

  if (!word.word) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  await addNewWord(word, JSON.stringify(req.user.id));
  return res.status(201).json(word);
};

const httpReadWords = async (req, res) => {
  res.status(200).json(await readWords(JSON.stringify(req.user.id)));
};

const httpDeleteWord = async (req, res) => {
  const selectedId = req.params.id;
  const exietsWord = await findWordByID(selectedId);
  if (!exietsWord) {
    return res.status(404).json({
      error: "Sorry! Word cannot found!!",
    });
  }
  const deleted = await deleteWord(selectedId);
  console.log(deleted);
  if (!deleted) {
    res.status(400).json({
      error: 'Word not deleted'
    })
  }
  return res.status(200).json({
    ok: true,
  });
};

module.exports = {
  httpAddNewWord,
  httpReadWords,
  httpDeleteWord,
};
