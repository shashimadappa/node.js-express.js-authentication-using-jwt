module.exports = function () {
  var router = require("express").Router();
  const signupController = require("../../controllers/user.controller");
  const validateToken = require('../../config/token')

  //register
  router.post("/signup", signupController.postInsertData);

  //signin
  router.post("/signin", signupController.signIn);

  router.get("/getall", validateToken.validateToken, signupController.getDataByQuery );

  return router;
};
