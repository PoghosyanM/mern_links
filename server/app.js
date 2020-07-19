const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const PORT = config.get("port");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes.js"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (err) {
    console.log("Server error: ", err.message);
    process.exit(1);
  }
}

start();
