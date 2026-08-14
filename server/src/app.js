const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const api = require("./routes/api");

const app = express();

app.use(cors({
  origin: env.clientOrigin.split(",").map((value) => value.trim()),
  methods: ["GET"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SkillGraph API",
    status: "running"
  });
});

app.use("/api", api);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const server = app.listen(env.port, () => {
  console.log(`SkillGraph API listening on port ${env.port}`);
});

process.on("SIGTERM", async () => {
  server.close();
});

process.on("SIGINT", async () => {
  server.close();
});
