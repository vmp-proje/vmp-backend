"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Media = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _mongoose["default"].Schema;
var mediaSchema = new schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Media = _mongoose["default"].model('media', mediaSchema);

exports.Media = Media;