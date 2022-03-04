const {
  addNewWord,
  readWords,
  deleteWord,
  findWordByID
} = require("../../models/words.model");

const httpAddNewWord = (req, res) => {
  const word = req.body;
  console.log(word);
  addNewWord(word);
  res.status(201).json(word);
};

const httpReadWords = async (req, res) => {
  res.status(200).json(await readWords());
};

const httpDeleteWord = async (req, res) => {
  const selectedId = req.params.id;
	const exietsWord = await findWordByID(selectedId);
	console.log(exietsWord);
	if (!exietsWord) {
		return res.status(404).json({
			error: 'Sorry! Word cannot found!!'
		})
	}
	await deleteWord(selectedId);
  return res.status(200).json({
		ok: true
	});
};

module.exports = {
  httpAddNewWord,
  httpReadWords,
  httpDeleteWord,
};
