// SkillGraph graph schema
// Run through a Neo4j-compatible Bolt client.

CREATE CONSTRAINT candidate_id_unique IF NOT EXISTS
FOR (n:Candidate) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT role_id_unique IF NOT EXISTS
FOR (n:Role) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
FOR (n:Skill) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT project_id_unique IF NOT EXISTS
FOR (n:Project) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT company_id_unique IF NOT EXISTS
FOR (n:Company) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT resource_id_unique IF NOT EXISTS
FOR (n:LearningResource) REQUIRE n.id IS UNIQUE;
