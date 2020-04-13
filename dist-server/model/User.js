"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _mongoose["default"].Schema;

_mongoose["default"].set('useCreateIndex', true);

var userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    small_picture_url: {
      type: String
    },
    big_picture_url: {
      type: String
    }
  }
}, {
  timestamps: true
});

userSchema.statics.isValid = function (body) {
  var schema = _joi["default"].object().keys({
    username: _joi["default"].string().required(),
    mail: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return _joi["default"].validate(body, schema);
};

userSchema.pre('save', function (next) {
  var user = this;
  var saltRound = 10;

  _bcrypt["default"].hash(user.password, saltRound, function (error, hashed) {
    if (error) {
      return next(error);
    }

    user.password = hashed;
    next();
  });
});

var User = _mongoose["default"].model('user', userSchema);

exports.User = User;