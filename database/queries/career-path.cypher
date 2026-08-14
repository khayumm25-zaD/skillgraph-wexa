// Career path traversal:
// Role -[:NEXT_STEP_TO]-> Role

MATCH (r:Role {id: $roleId})-[:NEXT_STEP_TO]->(nextRole:Role)
RETURN
  r.id AS currentRoleId,
  r.name AS currentRole,
  nextRole.id AS nextRoleId,
  nextRole.name AS nextRole,
  nextRole.level AS nextLevel
ORDER BY nextRole;
