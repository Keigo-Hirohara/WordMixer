const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { registerUser, findUser } = require("../../models/users.model");

const httpRegisterUser = async (req, res) => {
  const user = req.body;

  const takenUsername = await findUser(user.username);

  if (takenUsername) {
    return res.status(400).json({
      message: "ごめんなさい！このユーザーネームは既に登録されています",
      user: null
    });
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  const dbUser = await registerUser(user);

  return res.status(201).json({
    message: "success!",
    user: dbUser,
  });
};

const httpLoginUser = async (req, res) => {
  const userLoggedIn = req.body;
  await findUser(userLoggedIn.username).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({
        message: "ユーザーネーム、またはパスワードが一致しません！",
        invalid: true
      });
    }
    bcrypt.compare(userLoggedIn.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
          if (err) return res.json({ message: err });
          return res.status(200).json({
            message: "success",
            token: "Beerer " + token,
          });
        });
      } else {
        return res.status(400).json({
          message: "ユーザーネーム、またはパスワードが一致しません！",
          invalid: true
        });
      }
    });
  });
};

const httpValidateUser = (req, res) => {
  return res.json({
    isLoggedIn: true,
    username: req.user.username,
  });
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    return res.status(400).json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpValidateUser,
  verifyJWT,
};
