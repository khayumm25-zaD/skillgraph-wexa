const driver = require("./driver");

function normalize(value) {
  if (neo4jInteger(value)) return value.toNumber();
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    const output = {};
    for (const [key, item] of Object.entries(value)) {
      output[key] = normalize(item);
    }
    return output;
  }
  return value;
}

function neo4jInteger(value) {
  return value && typeof value === "object" &&
    typeof value.toNumber === "function" &&
    typeof value.low === "number" &&
    typeof value.high === "number";
}

async function runQuery(cypher, params = {}) {
  const session = driver.session();
  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => normalize(record.toObject()));
  } finally {
    await session.close();
  }
}

module.exports = { runQuery };
