const app = require("../index"); // import your express app

module.exports = (req, res) => {
  return app(req, res);
};
