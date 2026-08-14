const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");

const result = dotenv.config({
  path: envPath
});

if (result.error) {
  throw new Error(
    `Could not load environment file: ${envPath}`
  );
}

const requiredVariables = [
  "COGNODB_URI",
  "COGNODB_USERNAME",
  "COGNODB_PASSWORD"
];

for (const key of requiredVariables) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

module.exports = {
  port: Number(process.env.PORT || 5000),

  clientOrigin:
    process.env.CLIENT_ORIGIN ||
    "http://localhost:5173",

  cognodbUri: process.env.COGNODB_URI,

  cognodbUsername: process.env.COGNODB_USERNAME,

  cognodbPassword: process.env.COGNODB_PASSWORD
};