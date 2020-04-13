"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = "jwtkeyforsigning123456789!!!!!";

function sign(body) {
  return _jsonwebtoken["default"].sign({
    uuid: body.uuid,
    user_id: body._id
  }, secret);
}