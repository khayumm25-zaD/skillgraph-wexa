// Explainable role recommendation:
// Candidate -> Skill <- Role

MATCH (c:Candidate {id: $candidateId})
MATCH (r:Role)-[:REQUIRES]->(s:Skill)
OPTIONAL MATCH (c)-[:HAS_SKILL]->(matched:Skill)
WITH r, s, collect(DISTINCT matched.id) AS candidateSkills
WITH
  r,
  count(CASE WHEN s.id IN candidateSkills THEN 1 END) AS matchedSkills,
  count(s) AS totalSkills
RETURN
  r.name AS role,
  matchedSkills,
  totalSkills,
  CASE
    WHEN totalSkills = 0 THEN 0
    ELSE round(100.0 * matchedSkills / totalSkills)
  END AS matchPercentage
ORDER BY matchPercentage DESC;
