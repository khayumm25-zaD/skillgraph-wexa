// Role requirements compared with candidate skills.

MATCH (r:Role {id: $roleId})-[:REQUIRES]->(required:Skill)
OPTIONAL MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(existing:Skill)
WITH required, collect(DISTINCT existing.id) AS existingSkillIds
RETURN
  required.id AS skillId,
  required.name AS skill,
  required.category AS category,
  CASE
    WHEN required.id IN existingSkillIds THEN true
    ELSE false
  END AS demonstrated
ORDER BY demonstrated DESC, category, skill;
