"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controller/user");

var router = (0, _express.Router)();
router.post('/user/register', _user.registerUser);
router.post('/user/login', _user.loginUser);
var _default = router;
exports["default"] = _default;