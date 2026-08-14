// Required 2+ hop traversal:
// Candidate -> Project -> Skill -> Role

MATCH (c:Candidate {id: $candidateId})
      -[:WORKED_ON]->(p:Project)
      -[:DEMONSTRATES]->(s:Skill)
      <-[:REQUIRES]-(r:Role {id: $roleId})
RETURN DISTINCT
  s.name AS skill,
  p.name AS project,
  r.name AS role
ORDER BY skill;
