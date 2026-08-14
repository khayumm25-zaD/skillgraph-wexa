const { runQuery } = require("../db/query");

const queries = {
  // ------------------------------------------------------------
  // Candidate
  // ------------------------------------------------------------
  candidate: `
    MATCH (c:Candidate {id: $candidateId})
    OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)
    RETURN
      c.id AS id,
      c.name AS name,
      c.headline AS headline,
      count(DISTINCT s) AS skillCount
  `,

  // ------------------------------------------------------------
  // Roles ranked by candidate skill match
  // ------------------------------------------------------------
  roles: `
    MATCH (r:Role)
    OPTIONAL MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(r)
    WITH r, count(DISTINCT s) AS matchedSkills

    MATCH (r)-[:REQUIRES]->(required:Skill)
    WITH r, matchedSkills, count(DISTINCT required) AS totalSkills

    RETURN
      r.id AS id,
      r.name AS name,
      r.seniority AS level,
      r.description AS description,
      matchedSkills,
      totalSkills,
      CASE
        WHEN totalSkills = 0 THEN 0
        ELSE round(100.0 * matchedSkills / totalSkills)
      END AS matchPercentage

    ORDER BY matchPercentage DESC, r.name ASC
  `,

  // ------------------------------------------------------------
  // Single role
  // ------------------------------------------------------------
  role: `
    MATCH (r:Role {id: $roleId})
    OPTIONAL MATCH (r)-[req:REQUIRES]->(s:Skill)

    RETURN
      r.id AS id,
      r.name AS name,
      r.level AS level,
      r.description AS description,
      collect({
        id: s.id,
        name: s.name,
        category: s.category,
        importance: req.importance
      }) AS skills
  `,

  // ------------------------------------------------------------
  // Skill gap
  // ------------------------------------------------------------
  gap: `
    MATCH (r:Role {id: $roleId})-[:REQUIRES]->(required:Skill)

    OPTIONAL MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(existing:Skill)

    WITH
      required,
      collect(DISTINCT existing.id) AS existingSkillIds

    RETURN
      required.id AS skillId,
      required.name AS skill,
      required.category AS category,
      CASE
        WHEN required.id IN existingSkillIds THEN true
        ELSE false
      END AS demonstrated

    ORDER BY demonstrated DESC, category ASC, skill ASC
  `,

  // ------------------------------------------------------------
  // Project evidence
  // ------------------------------------------------------------
  evidence: `
    MATCH (r:Role {id: $roleId})-[:REQUIRES]->(s:Skill)

    OPTIONAL MATCH
      (c:Candidate {id: $candidateId})
      -[:WORKED_ON]->(p:Project)
      -[d:DEMONSTRATES]->(s)

    RETURN
      s.id AS skillId,
      s.name AS skill,
      collect(
        DISTINCT {
          id: p.id,
          name: p.name,
          evidence: d.evidence
        }
      ) AS projects

    ORDER BY skill ASC
  `,

  // ------------------------------------------------------------
  // Learning resources for missing skills
  // ------------------------------------------------------------
  resources: `
    MATCH (r:Role {id: $roleId})-[:REQUIRES]->(s:Skill)

    OPTIONAL MATCH
      (c:Candidate {id: $candidateId})
      -[:HAS_SKILL]->(existing:Skill)

    WITH
      s,
      collect(DISTINCT existing.id) AS existingSkillIds

    WHERE NOT s.id IN existingSkillIds

    MATCH (resource:LearningResource)-[:TEACHES]->(s)

    RETURN
      s.id AS skillId,
      s.name AS skill,
      collect(
        DISTINCT {
          id: resource.id,
          title: resource.title,
          type: resource.type,
          difficulty: resource.difficulty,
          url: resource.url
        }
      ) AS resources

    ORDER BY skill ASC
  `,

  // ------------------------------------------------------------
  // Top recommendations
  // ------------------------------------------------------------
  recommendations: `
    MATCH (c:Candidate {id: $candidateId})
    MATCH (r:Role)-[:REQUIRES]->(s:Skill)

    OPTIONAL MATCH (c)-[:HAS_SKILL]->(matched:Skill)

    WITH
      r,
      s,
      collect(DISTINCT matched.id) AS candidateSkills

    WITH
      r,
      count(
        CASE
          WHEN s.id IN candidateSkills THEN 1
        END
      ) AS matchedSkills,
      count(s) AS totalSkills

    RETURN
      r.id AS id,
      r.name AS name,
      r.level AS level,
      matchedSkills,
      totalSkills,
      CASE
        WHEN totalSkills = 0 THEN 0
        ELSE round(100.0 * matchedSkills / totalSkills)
      END AS matchPercentage

    ORDER BY matchPercentage DESC, r.name ASC
    LIMIT 5
  `,

  // ------------------------------------------------------------
  // Graph explorer
  //
  // Returns the selected role and its connected graph neighborhood.
  // ------------------------------------------------------------
  graph: `
    MATCH (r:Role {id: $roleId})

    OPTIONAL MATCH path = (r)-[*1..2]-(connected)

    WITH
      r,
      collect(DISTINCT connected)[0..50] AS connectedNodes

    UNWIND connectedNodes AS n

    OPTIONAL MATCH (n)-[rel]-(m)

    WHERE
      m IN connectedNodes
      OR m = r

    RETURN DISTINCT
      n.id AS sourceId,
      labels(n)[0] AS sourceType,
      n.name AS sourceName,
      type(rel) AS relationship,
      m.id AS targetId,
      labels(m)[0] AS targetType,
      m.name AS targetName

    LIMIT 200
  `,

  // ------------------------------------------------------------
  // Career path
  // ------------------------------------------------------------
  careerPath: `
    MATCH (r:Role {id: $roleId})
      -[:NEXT_STEP_TO]->
      (nextRole:Role)

    RETURN
      r.id AS currentRoleId,
      r.name AS currentRole,
      nextRole.id AS nextRoleId,
      nextRole.name AS nextRole,
      nextRole.level AS nextLevel

    ORDER BY nextRole.name ASC
  `
};

// ============================================================
// Candidate
// ============================================================

async function getCandidate(candidateId) {
  const results = await runQuery(
    queries.candidate,
    { candidateId }
  );

  return results[0] || null;
}

// ============================================================
// Roles
// ============================================================

async function getRoles(candidateId) {
  return runQuery(
    queries.roles,
    { candidateId }
  );
}

// ============================================================
// Single Role
// ============================================================

async function getRole(roleId) {
  const results = await runQuery(
    queries.role,
    { roleId }
  );

  return results[0] || null;
}

// ============================================================
// Skill Gap
// ============================================================

async function getGap(candidateId, roleId) {
  return runQuery(
    queries.gap,
    {
      candidateId,
      roleId
    }
  );
}

// ============================================================
// Project Evidence
// ============================================================

async function getEvidence(candidateId, roleId) {
  return runQuery(
    queries.evidence,
    {
      candidateId,
      roleId
    }
  );
}

// ============================================================
// Learning Resources
// ============================================================

async function getResources(candidateId, roleId) {
  return runQuery(
    queries.resources,
    {
      candidateId,
      roleId
    }
  );
}

// ============================================================
// Recommendations
// ============================================================

async function getRecommendations(candidateId) {
  return runQuery(
    queries.recommendations,
    { candidateId }
  );
}

// ============================================================
// Graph
// ============================================================

async function getGraph(roleId) {
  return runQuery(
    queries.graph,
    { roleId }
  );
}

// ============================================================
// Career Path
// ============================================================

async function getCareerPath(roleId) {
  return runQuery(
    queries.careerPath,
    { roleId }
  );
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  getCandidate,
  getRoles,
  getRole,
  getGap,
  getEvidence,
  getResources,
  getRecommendations,
  getGraph,
  getCareerPath
};