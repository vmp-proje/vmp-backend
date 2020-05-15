"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.registerUser = void 0;

var _auth = require("../helpers/auth");

var _User = require("../model/User");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var registerUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _User$isValid, error, value, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              status: 'failure',
              message: 'empty_body'
            }));

          case 2:
            _context.prev = 2;
            _User$isValid = _User.User.isValid(req.body), error = _User$isValid.error, value = _User$isValid.value;

            if (!error) {
              _context.next = 7;
              break;
            }

            console.error(error);
            return _context.abrupt("return", res.status(400).send({
              status: 'failure',
              message: 'invalid_body'
            }));

          case 7:
            _context.next = 9;
            return (0, _User.User)(value).save();

          case 9:
            user = _context.sent;
            return _context.abrupt("return", res.status(201).send({
              status: 'success',
              data: {
                token: (0, _auth.sign)(user)
              }
            }));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).send({
              status: 'failure',
              message: 'server_error'
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));

  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              status: 'failure',
              message: 'empty_body'
            }));

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return _User.User.findOne({
              mail: req.body.mail
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              status: 'failure',
              message: 'no_user'
            }));

          case 8:
            _bcrypt["default"].compare(req.body.password, user.password, function (error, matched) {
              if (error) {
                console.log(err);
              }

              if (matched) {
                return res.status(200).send({
                  status: 'success',
                  data: {
                    token: (0, _auth.sign)(user),
                    username: user.username
                  }
                });
              } else {
                return res.status(400).send({
                  status: 'failure',
                  message: 'no_user'
                });
              }
            });

            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            console.error(_context2.t0);
            return _context2.abrupt("return", res.status(500).send({
              status: 'failure',
              message: 'server_error'
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;