import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/vmpbackend_db', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", function (err) {
  console.log("MongoDB bağlantı hatası: ", err)
});

db.once('open', function callback() {
  console.log("MongoDB bağlantısı kuruldu")
});

db.on("open", function (err) {
  console.log("MongoDB bağlantıları tamamlandı", err)
});
