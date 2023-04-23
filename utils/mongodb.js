//configuring the mongoose connection with the database
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/habit", {
  useNewUrlParser: true,
});

//checking if the connection is properly setuped or not
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log(db.name,"database is connected");
});

