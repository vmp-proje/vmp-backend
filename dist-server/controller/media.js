"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnToVideo = void 0;

var _ytdlCore = _interopRequireDefault(require("ytdl-core"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

var _ffmpeg = _interopRequireDefault(require("@ffmpeg-installer/ffmpeg"));

var _readline = _interopRequireDefault(require("readline"));

var _path = _interopRequireDefault(require("path"));

var _Media = require("../model/Media");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var returnToVideo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videoUrl, isUrlValid, stream, videoId, thumbnail, pathToSave, duration, title, video_id, media, start;
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
            videoUrl = req.body.videoUrl;
            isUrlValid = _ytdlCore["default"].validateURL(videoUrl);

            if (isUrlValid) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              status: 'failure',
              message: 'invalid_url'
            }));

          case 6:
            stream = (0, _ytdlCore["default"])(videoUrl, {
              quality: 'lowestaudio'
            });
            videoId = _ytdlCore["default"].getVideoID(videoUrl);
            thumbnail = "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
            pathToSave = "././public/medias/" + videoId + ".mp3";
            _context.next = 12;
            return _ytdlCore["default"].getBasicInfo(videoUrl, function (err, info) {
              if (err) {
                console.log(err);
              }

              duration = parseInt(info.length_seconds);
              title = info.title;
              video_id = info.video_id;
            });

          case 12:
            _context.prev = 12;
            _context.next = 15;
            return (0, _Media.Media)({
              title: title,
              duration: duration,
              thumbnail: thumbnail,
              path: pathToSave
            }).save();

          case 15:
            media = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](12);
            return _context.abrupt("return", res.status(500).send({
              status: 'failure',
              message: 'server_error'
            }));

          case 21:
            _fluentFfmpeg["default"].setFfmpegPath(_ffmpeg["default"].path);

            start = Date.now();
            (0, _fluentFfmpeg["default"])(stream).audioBitrate(128).save(pathToSave).on('progress', function (p) {
              _readline["default"].cursorTo(process.stdout, 0);

              process.stdout.write("".concat(p.targetSize, "kb downloaded"));
            }).on('end', function () {
              console.log("\ndone, thanks - ".concat((Date.now() - start) / 1000, "s"));
              return res.status(200).send({
                status: 'ok',
                data: {
                  url: 'http://1db7aed7.ngrok.io/' + videoId + '.mp3',
                  title: media.title,
                  duration: media.duration,
                  thumbnail: media.thumbnail,
                  videoId: video_id
                }
              });
            }).on('error', function (err) {
              console.log(err);
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 18]]);
  }));

  return function returnToVideo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.returnToVideo = returnToVideo;