const graph = require("../services/graphService");
const driver = require("../db/driver");

// Must match the candidate ID created by server/seed.js
const DEFAULT_CANDIDATE = "candidate-001";

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);

      res.status(503).json({
        error: "GRAPH_DATABASE_UNAVAILABLE",
        message:
          "SkillGraph could not reach CognoDB. Please try again shortly."
      });
    }
  };
}

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

const health = asyncHandler(async (req, res) => {
  await driver.verifyConnectivity();

  res.json({
    status: "ok",
    database: "CognoDB",
    connected: true
  });
});

/*
|--------------------------------------------------------------------------
| Candidate
|--------------------------------------------------------------------------
*/

const candidate = asyncHandler(async (req, res) => {
  const data = await graph.getCandidate(DEFAULT_CANDIDATE);

  if (!data) {
    return res.status(404).json({
      message: "Candidate not found."
    });
  }

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Roles
|--------------------------------------------------------------------------
*/

const roles = asyncHandler(async (req, res) => {
  const data = await graph.getRoles(DEFAULT_CANDIDATE);

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Single role
|--------------------------------------------------------------------------
*/

const role = asyncHandler(async (req, res) => {
  const data = await graph.getRole(req.params.roleId);

  if (!data) {
    return res.status(404).json({
      message: "Role not found."
    });
  }

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Skill gap
|--------------------------------------------------------------------------
*/

const gap = asyncHandler(async (req, res) => {
  const data = await graph.getGap(
    DEFAULT_CANDIDATE,
    req.params.roleId
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Project evidence
|--------------------------------------------------------------------------
*/

const evidence = asyncHandler(async (req, res) => {
  const data = await graph.getEvidence(
    DEFAULT_CANDIDATE,
    req.params.roleId
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Learning resources
|--------------------------------------------------------------------------
*/

const resources = asyncHandler(async (req, res) => {
  const data = await graph.getResources(
    DEFAULT_CANDIDATE,
    req.params.roleId
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Recommendations
|--------------------------------------------------------------------------
*/

const recommendations = asyncHandler(async (req, res) => {
  const data = await graph.getRecommendations(
    DEFAULT_CANDIDATE
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Graph explorer
|--------------------------------------------------------------------------
*/

const graphView = asyncHandler(async (req, res) => {
  const data = await graph.getGraph(
    req.params.roleId
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Career path
|--------------------------------------------------------------------------
*/

const careerPath = asyncHandler(async (req, res) => {
  const data = await graph.getCareerPath(
    req.params.roleId
  );

  res.json(data);
});

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {
  health,
  candidate,
  roles,
  role,
  gap,
  evidence,
  resources,
  recommendations,
  graphView,
  careerPath
};