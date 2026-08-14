// 2-hop neighborhood used by the Graph Explorer.

MATCH (r:Role {id: $roleId})
OPTIONAL MATCH path = (r)-[*1..2]-(connected)
WITH r, collect(DISTINCT connected)[0..30] AS connectedNodes
UNWIND connectedNodes AS n
OPTIONAL MATCH (n)-[rel]-(m)
WHERE m IN connectedNodes OR m = r
RETURN DISTINCT
  n.id AS sourceId,
  labels(n)[0] AS sourceType,
  n.name AS sourceName,
  type(rel) AS relationship,
  m.id AS targetId,
  labels(m)[0] AS targetType,
  m.name AS targetName
LIMIT 120;
