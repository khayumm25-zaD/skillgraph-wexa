// Relationally awkward traversal:
// Role -> required Skill -> missing Skill -> Learning Resource

MATCH (r:Role {id: $roleId})-[:REQUIRES]->(s:Skill)
OPTIONAL MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(existing:Skill)
WITH s, collect(DISTINCT existing.id) AS existingSkillIds
WHERE NOT s.id IN existingSkillIds
MATCH (resource:LearningResource)-[:TEACHES]->(s)
RETURN
  s.name AS missingSkill,
  resource.title AS resource,
  resource.type AS type,
  resource.difficulty AS difficulty,
  resource.url AS url
ORDER BY missingSkill, resource;
