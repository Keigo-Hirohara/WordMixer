const user = require("./users.mongo");

const registerUser = async (newUser) => {
  console.log(newUser);
  return await user.create(newUser);
};

const findUser = async (username) => {
  return await user.findOne({ username: username });
};

module.exports = {registerUser, findUser};