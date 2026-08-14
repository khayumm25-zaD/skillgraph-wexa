const dotenv = require("dotenv");
dotenv.config({
  path: require("path").resolve(__dirname, ".env")
});

const neo4j = require("neo4j-driver");
const env = require("./src/config/env");

const driver = neo4j.driver(
  env.cognodbUri,
  neo4j.auth.basic(
    env.cognodbUsername,
    env.cognodbPassword
  )
);

/*
|--------------------------------------------------------------------------
| Seed data
|--------------------------------------------------------------------------
*/

const candidates = [
  {
    id: "candidate-001",
    name: "Khayum Mohammad",
    title: "Entry-Level Software / QA Engineer",
    location: "Hyderabad, India",
    experienceYears: 0
  }
];

const skills = [
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming",
    level: "Intermediate"
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: "Intermediate"
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    category: "Frontend",
    level: "Intermediate"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Intermediate"
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming",
    level: "Beginner"
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: "Intermediate"
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    level: "Intermediate"
  },
  {
    id: "rest-api",
    name: "REST APIs",
    category: "Backend",
    level: "Intermediate"
  },
  {
    id: "sql",
    name: "SQL",
    category: "Database",
    level: "Intermediate"
  },
  {
    id: "git",
    name: "Git",
    category: "Developer Tools",
    level: "Intermediate"
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    level: "Beginner"
  },
  {
    id: "java",
    name: "Java",
    category: "Programming",
    level: "Beginner"
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    level: "Beginner"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    level: "Beginner"
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    level: "Beginner"
  },
  {
    id: "system-design",
    name: "System Design",
    category: "Architecture",
    level: "Beginner"
  },
  {
    id: "testing",
    name: "Software Testing",
    category: "QA",
    level: "Intermediate"
  },
  {
    id: "selenium",
    name: "Selenium",
    category: "Automation",
    level: "Intermediate"
  },
  {
    id: "api-testing",
    name: "API Testing",
    category: "QA",
    level: "Intermediate"
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    category: "Analytics",
    level: "Intermediate"
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "Analytics",
    level: "Beginner"
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "Analytics",
    level: "Beginner"
  },
  {
    id: "communication",
    name: "Communication",
    category: "Professional",
    level: "Intermediate"
  }
];

const projects = [
  {
    id: "api-testing-framework",
    name: "API Testing Framework",
    description:
      "Reusable API automation framework with assertions, test cases and reporting.",
    role: "QA Automation Engineer"
  },
  {
    id: "jobpilot",
    name: "JobPilot",
    description:
      "Job application management platform with React frontend and Node.js backend.",
    role: "Software Engineer"
  },
  {
    id: "cloudshop",
    name: "CloudShop",
    description:
      "Cloud-native e-commerce application using service-oriented backend architecture.",
    role: "Backend Engineer"
  },
  {
    id: "sales-analytics",
    name: "Sales Analytics",
    description:
      "Analytics dashboard for exploring sales performance and business KPIs.",
    role: "Data Analyst"
  },
  {
    id: "selenium-framework",
    name: "Selenium Hybrid Framework",
    description:
      "Reusable UI automation framework using Page Object Model and test reporting.",
    role: "QA Automation Engineer"
  },
  {
    id: "portfolio",
    name: "Developer Portfolio",
    description:
      "Responsive developer portfolio showcasing projects, skills and experience.",
    role: "Frontend Engineer"
  }
];

const roles = [
  {
    id: "frontend-engineer",
    name: "Frontend Engineer",
    category: "Software Engineering",
    seniority: "Entry Level",
    description:
      "Build responsive and interactive web interfaces using modern frontend technologies."
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    category: "Software Engineering",
    seniority: "Entry Level",
    description:
      "Design, build and maintain software applications and APIs."
  },
  {
    id: "qa-automation-engineer",
    name: "QA Automation Engineer",
    category: "Quality Engineering",
    seniority: "Entry Level",
    description:
      "Build automated tests and quality engineering workflows for software products."
  },
  {
    id: "backend-engineer",
    name: "Backend Engineer",
    category: "Software Engineering",
    seniority: "Entry Level",
    description:
      "Build backend services, APIs and data-driven application workflows."
  },
  {
    id: "cloud-devops-engineer",
    name: "Cloud / DevOps Engineer",
    category: "Cloud Engineering",
    seniority: "Entry Level",
    description:
      "Automate deployments and operate cloud infrastructure and services."
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    category: "Analytics",
    seniority: "Entry Level",
    description:
      "Turn business data into analysis, dashboards and actionable insights."
  }
];

const companies = [
  {
    id: "wexa",
    name: "Wexa AI",
    industry: "AI Automation"
  },
  {
    id: "cloudnova",
    name: "CloudNova",
    industry: "Cloud Infrastructure"
  },
  {
    id: "finlytics",
    name: "Finlytics",
    industry: "FinTech"
  },
  {
    id: "qualitylabs",
    name: "QualityLabs",
    industry: "Software Quality"
  },
  {
    id: "techforge",
    name: "TechForge",
    industry: "Software Engineering"
  }
];

const resources = [
  {
    id: "docker-fundamentals",
    title: "Docker Fundamentals",
    type: "Course",
    difficulty: "Beginner",
    url: "https://docs.docker.com/get-started/"
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    type: "Course",
    difficulty: "Beginner",
    url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/"
  },
  {
    id: "system-design-primer",
    title: "System Design Primer",
    type: "Guide",
    difficulty: "Intermediate",
    url: "https://github.com/donnemartin/system-design-primer"
  },
  {
    id: "kubernetes-basics",
    title: "Kubernetes Basics",
    type: "Course",
    difficulty: "Intermediate",
    url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/"
  },
  {
    id: "typescript-handbook",
    title: "TypeScript Handbook",
    type: "Documentation",
    difficulty: "Beginner",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html"
  },
  {
    id: "react-learn",
    title: "React Learn",
    type: "Documentation",
    difficulty: "Beginner",
    url: "https://react.dev/learn"
  },
  {
    id: "node-learn",
    title: "Node.js Learn",
    type: "Documentation",
    difficulty: "Beginner",
    url: "https://nodejs.org/en/learn"
  },
  {
    id: "sqlbolt",
    title: "SQLBolt",
    type: "Interactive",
    difficulty: "Beginner",
    url: "https://sqlbolt.com/"
  },
  {
    id: "selenium-docs",
    title: "Selenium Documentation",
    type: "Documentation",
    difficulty: "Intermediate",
    url: "https://www.selenium.dev/documentation/"
  },
  {
    id: "powerbi-learning",
    title: "Power BI Learning",
    type: "Course",
    difficulty: "Beginner",
    url: "https://learn.microsoft.com/power-bi/"
  }
];

/*
|--------------------------------------------------------------------------
| Relationships
|--------------------------------------------------------------------------
*/

const roleSkills = [
  // Frontend Engineer
  {
    roleId: "frontend-engineer",
    skillId: "html-css",
    importance: "essential"
  },
  {
    roleId: "frontend-engineer",
    skillId: "javascript",
    importance: "essential"
  },
  {
    roleId: "frontend-engineer",
    skillId: "react",
    importance: "essential"
  },
  {
    roleId: "frontend-engineer",
    skillId: "typescript",
    importance: "preferred"
  },
  {
    roleId: "frontend-engineer",
    skillId: "git",
    importance: "essential"
  },
  {
    roleId: "frontend-engineer",
    skillId: "tailwind",
    importance: "preferred"
  },
  {
    roleId: "frontend-engineer",
    skillId: "rest-api",
    importance: "preferred"
  },

  // Software Engineer
  {
    roleId: "software-engineer",
    skillId: "javascript",
    importance: "essential"
  },
  {
    roleId: "software-engineer",
    skillId: "python",
    importance: "preferred"
  },
  {
    roleId: "software-engineer",
    skillId: "java",
    importance: "preferred"
  },
  {
    roleId: "software-engineer",
    skillId: "rest-api",
    importance: "essential"
  },
  {
    roleId: "software-engineer",
    skillId: "sql",
    importance: "essential"
  },
  {
    roleId: "software-engineer",
    skillId: "git",
    importance: "essential"
  },
  {
    roleId: "software-engineer",
    skillId: "docker",
    importance: "preferred"
  },
  {
    roleId: "software-engineer",
    skillId: "system-design",
    importance: "preferred"
  },
  {
    roleId: "software-engineer",
    skillId: "testing",
    importance: "preferred"
  },

  // QA Automation Engineer
  {
    roleId: "qa-automation-engineer",
    skillId: "testing",
    importance: "essential"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "selenium",
    importance: "essential"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "api-testing",
    importance: "essential"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "javascript",
    importance: "preferred"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "python",
    importance: "preferred"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "sql",
    importance: "preferred"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "git",
    importance: "essential"
  },
  {
    roleId: "qa-automation-engineer",
    skillId: "rest-api",
    importance: "essential"
  },

  // Backend Engineer
  {
    roleId: "backend-engineer",
    skillId: "nodejs",
    importance: "essential"
  },
  {
    roleId: "backend-engineer",
    skillId: "express",
    importance: "essential"
  },
  {
    roleId: "backend-engineer",
    skillId: "rest-api",
    importance: "essential"
  },
  {
    roleId: "backend-engineer",
    skillId: "sql",
    importance: "essential"
  },
  {
    roleId: "backend-engineer",
    skillId: "git",
    importance: "essential"
  },
  {
    roleId: "backend-engineer",
    skillId: "docker",
    importance: "preferred"
  },
  {
    roleId: "backend-engineer",
    skillId: "javascript",
    importance: "preferred"
  },
  {
    roleId: "backend-engineer",
    skillId: "system-design",
    importance: "preferred"
  },

  // Cloud / DevOps Engineer
  {
    roleId: "cloud-devops-engineer",
    skillId: "git",
    importance: "essential"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "docker",
    importance: "essential"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "aws",
    importance: "essential"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "kubernetes",
    importance: "preferred"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "python",
    importance: "preferred"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "rest-api",
    importance: "preferred"
  },
  {
    roleId: "cloud-devops-engineer",
    skillId: "system-design",
    importance: "essential"
  },

  // Data Analyst
  {
    roleId: "data-analyst",
    skillId: "sql",
    importance: "essential"
  },
  {
    roleId: "data-analyst",
    skillId: "python",
    importance: "preferred"
  },
  {
    roleId: "data-analyst",
    skillId: "pandas",
    importance: "essential"
  },
  {
    roleId: "data-analyst",
    skillId: "data-analysis",
    importance: "essential"
  },
  {
    roleId: "data-analyst",
    skillId: "power-bi",
    importance: "preferred"
  },
  {
    roleId: "data-analyst",
    skillId: "communication",
    importance: "essential"
  },
  {
    roleId: "data-analyst",
    skillId: "git",
    importance: "preferred"
  }
];

const projectSkills = [
  {
    projectId: "api-testing-framework",
    skillId: "java",
    evidence:
      "Implemented API test suites and reusable assertions."
  },
  {
    projectId: "api-testing-framework",
    skillId: "rest-api",
    evidence:
      "Validated REST endpoints and HTTP contracts."
  },
  {
    projectId: "api-testing-framework",
    skillId: "api-testing",
    evidence:
      "Created automated API validation workflows."
  },
  {
    projectId: "api-testing-framework",
    skillId: "testing",
    evidence:
      "Applied test design and regression techniques."
  },
  {
    projectId: "api-testing-framework",
    skillId: "git",
    evidence:
      "Versioned the framework and test assets."
  },

  {
    projectId: "jobpilot",
    skillId: "javascript",
    evidence:
      "Built interactive application flows and data handling."
  },
  {
    projectId: "jobpilot",
    skillId: "react",
    evidence:
      "Implemented reusable React UI components."
  },
  {
    projectId: "jobpilot",
    skillId: "nodejs",
    evidence:
      "Implemented backend services and API routes."
  },
  {
    projectId: "jobpilot",
    skillId: "rest-api",
    evidence:
      "Consumed and exposed REST endpoints."
  },
  {
    projectId: "jobpilot",
    skillId: "sql",
    evidence:
      "Worked with structured application data."
  },
  {
    projectId: "jobpilot",
    skillId: "git",
    evidence:
      "Managed source control and feature branches."
  },

  {
    projectId: "cloudshop",
    skillId: "nodejs",
    evidence:
      "Built service APIs for application workflows."
  },
  {
    projectId: "cloudshop",
    skillId: "rest-api",
    evidence:
      "Designed HTTP APIs between application components."
  },
  {
    projectId: "cloudshop",
    skillId: "docker",
    evidence:
      "Containerized application services."
  },
  {
    projectId: "cloudshop",
    skillId: "javascript",
    evidence:
      "Implemented backend application logic."
  },
  {
    projectId: "cloudshop",
    skillId: "git",
    evidence:
      "Managed service code in Git."
  },

  {
    projectId: "sales-analytics",
    skillId: "sql",
    evidence:
      "Queried datasets for business analysis."
  },
  {
    projectId: "sales-analytics",
    skillId: "data-analysis",
    evidence:
      "Identified trends and performance patterns."
  },
  {
    projectId: "sales-analytics",
    skillId: "pandas",
    evidence:
      "Prepared datasets using Python data tooling."
  },
  {
    projectId: "sales-analytics",
    skillId: "power-bi",
    evidence:
      "Created dashboard views for KPIs."
  },
  {
    projectId: "sales-analytics",
    skillId: "communication",
    evidence:
      "Presented findings in business-friendly language."
  },

  {
    projectId: "selenium-framework",
    skillId: "selenium",
    evidence:
      "Built browser automation using Page Objects."
  },
  {
    projectId: "selenium-framework",
    skillId: "testing",
    evidence:
      "Designed functional and regression test cases."
  },
  {
    projectId: "selenium-framework",
    skillId: "javascript",
    evidence:
      "Implemented automation utilities."
  },
  {
    projectId: "selenium-framework",
    skillId: "git",
    evidence:
      "Maintained automation source code."
  },

  {
    projectId: "portfolio",
    skillId: "html-css",
    evidence:
      "Built responsive page layouts."
  },
  {
    projectId: "portfolio",
    skillId: "javascript",
    evidence:
      "Added client-side interactions."
  },
  {
    projectId: "portfolio",
    skillId: "react",
    evidence:
      "Built reusable interface components."
  },
  {
    projectId: "portfolio",
    skillId: "tailwind",
    evidence:
      "Implemented utility-first responsive styling."
  },
  {
    projectId: "portfolio",
    skillId: "git",
    evidence:
      "Versioned the portfolio project."
  }
];

const candidateSkills = [
  {
    candidateId: "candidate-001",
    skillId: "javascript",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "react",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "html-css",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "nodejs",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "rest-api",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "sql",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "git",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "testing",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "api-testing",
    level: "strong"
  },
  {
    candidateId: "candidate-001",
    skillId: "selenium",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "java",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "docker",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "data-analysis",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "pandas",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "power-bi",
    level: "working"
  },
  {
    candidateId: "candidate-001",
    skillId: "communication",
    level: "strong"
  }
];

const resourceSkills = [
  {
    resourceId: "docker-fundamentals",
    skillId: "docker"
  },
  {
    resourceId: "aws-cloud-practitioner",
    skillId: "aws"
  },
  {
    resourceId: "system-design-primer",
    skillId: "system-design"
  },
  {
    resourceId: "kubernetes-basics",
    skillId: "kubernetes"
  },
  {
    resourceId: "typescript-handbook",
    skillId: "typescript"
  },
  {
    resourceId: "react-learn",
    skillId: "react"
  },
  {
    resourceId: "node-learn",
    skillId: "nodejs"
  },
  {
    resourceId: "sqlbolt",
    skillId: "sql"
  },
  {
    resourceId: "selenium-docs",
    skillId: "selenium"
  },
  {
    resourceId: "powerbi-learning",
    skillId: "power-bi"
  }
];

const companyRoles = [
  {
    companyId: "wexa",
    roleId: "software-engineer"
  },
  {
    companyId: "wexa",
    roleId: "qa-automation-engineer"
  },
  {
    companyId: "cloudnova",
    roleId: "cloud-devops-engineer"
  },
  {
    companyId: "cloudnova",
    roleId: "backend-engineer"
  },
  {
    companyId: "finlytics",
    roleId: "data-analyst"
  },
  {
    companyId: "qualitylabs",
    roleId: "qa-automation-engineer"
  },
  {
    companyId: "techforge",
    roleId: "frontend-engineer"
  },
  {
    companyId: "techforge",
    roleId: "software-engineer"
  }
];

const candidateProjects = [
  {
    candidateId: "candidate-001",
    projectId: "api-testing-framework"
  },
  {
    candidateId: "candidate-001",
    projectId: "jobpilot"
  },
  {
    candidateId: "candidate-001",
    projectId: "cloudshop"
  },
  {
    candidateId: "candidate-001",
    projectId: "sales-analytics"
  },
  {
    candidateId: "candidate-001",
    projectId: "selenium-framework"
  },
  {
    candidateId: "candidate-001",
    projectId: "portfolio"
  }
];

const transitions = [
  {
    fromRoleId: "qa-automation-engineer",
    toRoleId: "software-engineer",
    difficulty: "medium"
  },
  {
    fromRoleId: "frontend-engineer",
    toRoleId: "software-engineer",
    difficulty: "low"
  },
  {
    fromRoleId: "backend-engineer",
    toRoleId: "software-engineer",
    difficulty: "low"
  },
  {
    fromRoleId: "data-analyst",
    toRoleId: "software-engineer",
    difficulty: "high"
  },
  {
    fromRoleId: "software-engineer",
    toRoleId: "cloud-devops-engineer",
    difficulty: "medium"
  }
];

/*
|--------------------------------------------------------------------------
| Seed helpers
|--------------------------------------------------------------------------
*/

async function run() {
  const session = driver.session();

  try {
    console.log("Connecting to CognoDB...");

    await driver.verifyConnectivity();

    console.log("Connected to CognoDB.");

    /*
    |--------------------------------------------------------------------------
    | Clean previous SkillGraph data
    |--------------------------------------------------------------------------
    */

    console.log("Clearing previous SkillGraph data...");

    await session.run(`
      MATCH (n)
      WHERE n:Candidate
         OR n:Skill
         OR n:Project
         OR n:Role
         OR n:Company
         OR n:LearningResource
      DETACH DELETE n
    `);

    /*
    |--------------------------------------------------------------------------
    | Create indexes / constraints
    |--------------------------------------------------------------------------
    */

    const constraints = [
      `
      CREATE CONSTRAINT candidate_id_unique IF NOT EXISTS
      FOR (n:Candidate)
      REQUIRE n.id IS UNIQUE
      `,
      `
      CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
      FOR (n:Skill)
      REQUIRE n.id IS UNIQUE
      `,
      `
      CREATE CONSTRAINT project_id_unique IF NOT EXISTS
      FOR (n:Project)
      REQUIRE n.id IS UNIQUE
      `,
      `
      CREATE CONSTRAINT role_id_unique IF NOT EXISTS
      FOR (n:Role)
      REQUIRE n.id IS UNIQUE
      `,
      `
      CREATE CONSTRAINT company_id_unique IF NOT EXISTS
      FOR (n:Company)
      REQUIRE n.id IS UNIQUE
      `,
      `
      CREATE CONSTRAINT resource_id_unique IF NOT EXISTS
      FOR (n:LearningResource)
      REQUIRE n.id IS UNIQUE
      `
    ];

    for (const constraint of constraints) {
      try {
        await session.run(constraint);
      } catch (error) {
        /*
         * Some CognoDB/openCypher versions may not support
         * IF NOT EXISTS on constraints. The seed should still
         * continue if the constraint already exists.
         */
        console.log(
          "Constraint notice:",
          error.message
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Candidates
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (c:Candidate {id: item.id})

      SET
        c.name = item.name,
        c.title = item.title,
        c.location = item.location,
        c.experienceYears = item.experienceYears
      `,
      { items: candidates }
    );

    /*
    |--------------------------------------------------------------------------
    | Skills
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (s:Skill {id: item.id})

      SET
        s.name = item.name,
        s.category = item.category,
        s.level = item.level
      `,
      { items: skills }
    );

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (p:Project {id: item.id})

      SET
        p.name = item.name,
        p.description = item.description,
        p.role = item.role
      `,
      { items: projects }
    );

    /*
    |--------------------------------------------------------------------------
    | Roles
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (r:Role {id: item.id})

      SET
        r.name = item.name,
        r.category = item.category,
        r.seniority = item.seniority,
        r.description = item.description
      `,
      { items: roles }
    );

    /*
    |--------------------------------------------------------------------------
    | Companies
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (c:Company {id: item.id})

      SET
        c.name = item.name,
        c.industry = item.industry
      `,
      { items: companies }
    );

    /*
    |--------------------------------------------------------------------------
    | Learning resources
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MERGE (r:LearningResource {id: item.id})

      SET
        r.title = item.title,
        r.type = item.type,
        r.difficulty = item.difficulty,
        r.url = item.url
      `,
      { items: resources }
    );

    /*
    |--------------------------------------------------------------------------
    | Candidate -> Skill
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (c:Candidate {id: item.candidateId})
      MATCH (s:Skill {id: item.skillId})

      MERGE (c)-[rel:HAS_SKILL]->(s)

      SET rel.level = item.level
      `,
      { items: candidateSkills }
    );

    /*
    |--------------------------------------------------------------------------
    | Candidate -> Project
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (c:Candidate {id: item.candidateId})
      MATCH (p:Project {id: item.projectId})

      MERGE (c)-[:WORKED_ON]->(p)
      `,
      { items: candidateProjects }
    );

    /*
    |--------------------------------------------------------------------------
    | Project -> Skill
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (p:Project {id: item.projectId})
      MATCH (s:Skill {id: item.skillId})

      MERGE (p)-[rel:DEMONSTRATES]->(s)

      SET rel.evidence = item.evidence
      `,
      { items: projectSkills }
    );

    /*
    |--------------------------------------------------------------------------
    | Role -> Skill
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (r:Role {id: item.roleId})
      MATCH (s:Skill {id: item.skillId})

      MERGE (r)-[rel:REQUIRES]->(s)

      SET rel.importance = item.importance
      `,
      { items: roleSkills }
    );

    /*
    |--------------------------------------------------------------------------
    | Company -> Role
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (c:Company {id: item.companyId})
      MATCH (r:Role {id: item.roleId})

      MERGE (c)-[:HIRING_FOR]->(r)
      `,
      { items: companyRoles }
    );

    /*
    |--------------------------------------------------------------------------
    | LearningResource -> Skill
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (r:LearningResource {id: item.resourceId})
      MATCH (s:Skill {id: item.skillId})

      MERGE (r)-[:TEACHES]->(s)
      `,
      { items: resourceSkills }
    );

    /*
    |--------------------------------------------------------------------------
    | Role -> Role career transitions
    |--------------------------------------------------------------------------
    */

    await session.run(
      `
      UNWIND $items AS item

      MATCH (fromRole:Role {id: item.fromRoleId})
      MATCH (toRole:Role {id: item.toRoleId})

      MERGE (fromRole)-[rel:NEXT_STEP_TO]->(toRole)

      SET rel.difficulty = item.difficulty
      `,
      { items: transitions }
    );

    /*
    |--------------------------------------------------------------------------
    | Summary
    |--------------------------------------------------------------------------
    */

    const summary = await session.run(`
      MATCH (n)
      WHERE n:Candidate
         OR n:Skill
         OR n:Project
         OR n:Role
         OR n:Company
         OR n:LearningResource

      WITH labels(n) AS labels

      UNWIND labels AS label

      RETURN label, count(*) AS count
      ORDER BY label
    `);

    console.log("\nSeed completed successfully.\n");

    for (const record of summary.records) {
      console.log(
        `${record.get("label")}: ${record
          .get("count")
          .toNumber()}`
      );
    }

    console.log("\nSkillGraph database is ready.");
  } catch (error) {
    console.error("\nSeed failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

run();