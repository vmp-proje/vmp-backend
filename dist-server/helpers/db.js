"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set('useFindAndModify', false);

_mongoose["default"].connect('mongodb://localhost:27017/vmpbackend_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on("error", function (err) {
  console.log("MongoDB bağlantı hatası: ", err);
});
db.once('open', function callback() {
  console.log("MongoDB bağlantısı kuruldu");
});
db.on("open", function (err) {
  console.log("MongoDB bağlantıları tamamlandı", err);
});