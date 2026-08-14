import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleAlert,
  Database,
  GitBranch,
  GraduationCap,
  LayoutDashboard,
  LoaderCircle,
  Network,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  X
} from "lucide-react";

import { api } from "./api";

const typeLabels = {
  Role: "Role",
  Skill: "Skill",
  Project: "Project",
  Company: "Company",
  LearningResource: "Resource",
  Candidate: "Candidate"
};

function App() {
  const [candidate, setCandidate] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(
    "software-engineer"
  );
  const [selectedRole, setSelectedRole] = useState(null);
  const [gap, setGap] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [resources, setResources] = useState([]);
  const [graph, setGraph] = useState([]);

  const [view, setView] = useState("dashboard");
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);
  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  /*
   * ------------------------------------------------------------
   * LOAD CANDIDATE + ROLES
   * ------------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const [candidateData, rolesData] = await Promise.all([
          api.candidate(),
          api.roles()
        ]);

        if (!cancelled) {
          setCandidate(candidateData);
          setRoles(rolesData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  /*
   * ------------------------------------------------------------
   * LOAD SELECTED ROLE
   * ------------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    async function loadRole() {
      if (!selectedRoleId) return;

      setRoleLoading(true);
      setError("");

      try {
        const [
          roleData,
          gapData,
          evidenceData,
          resourcesData,
          graphData
        ] = await Promise.all([
          api.role(selectedRoleId),
          api.gap(selectedRoleId),
          api.evidence(selectedRoleId),
          api.resources(selectedRoleId),
          api.graph(selectedRoleId)
        ]);

        if (!cancelled) {
          setSelectedRole(roleData);
          setGap(gapData);
          setEvidence(evidenceData);
          setResources(resourcesData);
          setGraph(graphData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setRoleLoading(false);
        }
      }
    }

    loadRole();

    return () => {
      cancelled = true;
    };
  }, [selectedRoleId, refreshKey]);

  /*
   * ------------------------------------------------------------
   * FILTER ROLES
   * ------------------------------------------------------------
   */

  const filteredRoles = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return roles;
    }

    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(term) ||
        role.level.toLowerCase().includes(term)
    );
  }, [roles, query]);

  /*
   * ------------------------------------------------------------
   * SKILL METRICS
   * ------------------------------------------------------------
   */

  const demonstrated = gap.filter(
    (item) => item.demonstrated
  ).length;

  const missing = gap.length - demonstrated;

  const coverage = gap.length
    ? Math.round((demonstrated / gap.length) * 100)
    : 0;

  /*
   * ------------------------------------------------------------
   * OPEN ROLE
   * ------------------------------------------------------------
   */

  function openRole(roleId) {
    setSelectedRoleId(roleId);
    setView("role");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /*
   * ------------------------------------------------------------
   * LOADING SCREEN
   * ------------------------------------------------------------
   */

  if (loading) {
    return <LoadingScreen />;
  }

  /*
   * ------------------------------------------------------------
   * APP
   * ------------------------------------------------------------
   */

  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">
            <Network size={20} />
          </div>

          <div>
            <strong>SkillGraph</strong>
            <span>Career intelligence</span>
          </div>
        </div>

        <nav className="nav">

          <button
            className={
              view === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setView("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={
              view === "role"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setView("role")}
          >
            <Target size={18} />
            Role explorer
          </button>

          <button
            className={
              view === "graph"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setView("graph")}
          >
            <GitBranch size={18} />
            Graph explorer
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="db-status">
            <span className="status-dot" />
            CognoDB connected
          </div>

          <button
            className="refresh-button"
            onClick={() =>
              setRefreshKey((value) => value + 1)
            }
          >
            <RefreshCw size={15} />
            Refresh graph
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              CAREER GRAPH
            </p>

            <h1>
              {view === "dashboard"
                ? "Find your strongest career paths."
                : view === "role"
                  ? selectedRole?.name ||
                    "Role explorer"
                  : "Explore the graph behind the recommendation."}
            </h1>

          </div>

          <div className="profile-chip">

            <div className="avatar">
              K
            </div>

            <div>
              <strong>
                {candidate?.name || "Candidate"}
              </strong>

              <span>
                {candidate?.headline ||
                  "Career explorer"}
              </span>
            </div>

          </div>

        </header>

        {/* ERROR */}

        {error && (
          <div className="error-banner">

            <CircleAlert size={19} />

            <div>
              <strong>
                Graph database unavailable
              </strong>

              <p>{error}</p>
            </div>

            <button
              onClick={() =>
                setRefreshKey((value) => value + 1)
              }
            >
              Retry
            </button>

          </div>
        )}

        {/* DASHBOARD */}

        {view === "dashboard" && (
          <Dashboard
            roles={roles}
            filteredRoles={filteredRoles}
            query={query}
            setQuery={setQuery}
            coverage={coverage}
            demonstrated={demonstrated}
            missing={missing}
            openRole={openRole}
          />
        )}

        {/* ROLE */}

        {view === "role" && (
          <RoleExplorer
            selectedRole={selectedRole}
            gap={gap}
            evidence={evidence}
            resources={resources}
            loading={roleLoading}
            coverage={coverage}
            demonstrated={demonstrated}
            missing={missing}
            openGraph={() => setView("graph")}
          />
        )}

        {/* GRAPH */}

        {view === "graph" && (
          <GraphExplorer
            role={selectedRole}
            graph={graph}
            loading={roleLoading}
          />
        )}

      </main>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

function Dashboard({
  roles,
  filteredRoles,
  query,
  setQuery,
  demonstrated,
  missing,
  openRole
}) {
  const top = roles[0];

  return (
    <div className="content">

      <section className="hero-grid">

        <div className="hero-card">

          <div className="hero-copy">

            <div className="icon-badge">
              <Sparkles size={18} />
            </div>

            <p className="eyebrow">
              EXPLAINABLE MATCHING
            </p>

            <h2>
              Your graph says{" "}
              <span>
                {top?.name || "Software Engineer"}
              </span>{" "}
              is your strongest starting point.
            </h2>

            <p>
              SkillGraph connects your projects
              and demonstrated skills to real role
              requirements, so every recommendation
              has evidence behind it.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                top && openRole(top.id)
              }
            >
              Explore recommendation
              <ArrowRight size={17} />
            </button>

          </div>

          <div className="hero-score">

            <div
              className="score-ring"
              style={{
                "--score": `${top?.matchPercentage || 0}%`
              }}
            >
              <div>

                <strong>
                  {top?.matchPercentage || 0}%
                </strong>

                <span>
                  match
                </span>

              </div>
            </div>

          </div>

        </div>

        <div className="metrics">

          <Metric
            icon={<BriefcaseBusiness />}
            label="Roles mapped"
            value={roles.length}
          />

          <Metric
            icon={<Check />}
            label="Current skills"
            value={demonstrated}
          />

          <Metric
            icon={<Target />}
            label="Current gap"
            value={missing}
          />

        </div>

      </section>

      <section className="section-header">

        <div>
          <p className="eyebrow">
            ROLE MAP
          </p>

          <h2>
            Career paths ranked by fit
          </h2>
        </div>

        <div className="search-box">

          <Search size={17} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search roles..."
          />

        </div>

      </section>

      <div className="role-grid">

        {filteredRoles.map((role) => (

          <button
            key={role.id}
            className="role-card"
            onClick={() =>
              openRole(role.id)
            }
          >

            <div className="role-card-top">

              <span className="tag">
                {role.level}
              </span>

              <span className="role-score">
                {role.matchPercentage}%
              </span>

            </div>

            <h3>
              {role.name}
            </h3>

            <p>
              {role.description}
            </p>

            <div className="match-bar">

              <span
                style={{
                  width: `${role.matchPercentage}%`
                }}
              />

            </div>

            <div className="role-card-footer">

              <span>
                {role.matchedSkills} matched skills
              </span>

              <ChevronRight size={16} />

            </div>

          </button>

        ))}

      </div>

      {!filteredRoles.length && (
        <EmptyState
          title="No roles found"
          message="Try a different search term."
        />
      )}

      <section className="why-card">

        <div>

          <div className="icon-badge">
            <Database size={18} />
          </div>

          <p className="eyebrow">
            WHY GRAPH?
          </p>

          <h2>
            Relationships are the product.
          </h2>

        </div>

        <p>
          The recommendation is not a flat
          score stored in a table. It is derived
          by traversing Candidate → Skill ← Role
          and Candidate → Project → Skill → Role
          paths in CognoDB.
        </p>

      </section>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| ROLE EXPLORER
|--------------------------------------------------------------------------
*/

function RoleExplorer({
  selectedRole,
  gap,
  evidence,
  resources,
  loading,
  coverage,
  demonstrated,
  missing,
  openGraph
}) {
  if (loading || !selectedRole) {
    return <LoadingPanel />;
  }

  return (
    <div className="content">

      <section className="role-header-card">

        <div>

          <span className="tag">
            {selectedRole.level}
          </span>

          <h2>
            {selectedRole.name}
          </h2>

          <p>
            {selectedRole.description}
          </p>

        </div>

        <div className="coverage-box">

          <span>
            Skill coverage
          </span>

          <strong>
            {coverage}%
          </strong>

          <small>
            {demonstrated} of {gap.length} demonstrated
          </small>

        </div>

      </section>

      <div className="detail-grid">

        {/* SKILL GAP */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <p className="eyebrow">
                SKILL GAP
              </p>

              <h3>
                What you already have
              </h3>

            </div>

            <span className="count-pill">
              {missing} missing
            </span>

          </div>

          <div className="skill-list">

            {gap.map((item) => (

              <div
                className="skill-row"
                key={item.skillId}
              >

                <div
                  className={
                    item.demonstrated
                      ? "skill-icon done"
                      : "skill-icon missing"
                  }
                >
                  {item.demonstrated ? (
                    <Check size={14} />
                  ) : (
                    <X size={14} />
                  )}
                </div>

                <div className="skill-info">

                  <strong>
                    {item.skill}
                  </strong>

                  <span>
                    {item.category}
                  </span>

                </div>

                <span
                  className={
                    item.demonstrated
                      ? "skill-status done-text"
                      : "skill-status"
                  }
                >
                  {item.demonstrated
                    ? "Demonstrated"
                    : "Missing"}
                </span>

              </div>

            ))}

          </div>

        </section>

        {/* EVIDENCE */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <p className="eyebrow">
                PROJECT EVIDENCE
              </p>

              <h3>
                Why the graph believes you
              </h3>

            </div>

          </div>

          <div className="evidence-list">

            {evidence
              .filter((item) =>
                item.projects.some(
                  (project) => project.id
                )
              )
              .map((item) => (

                <div
                  className="evidence-item"
                  key={item.skillId}
                >

                  <strong>
                    {item.skill}
                  </strong>

                  {item.projects
                    .filter(
                      (project) => project.id
                    )
                    .slice(0, 2)
                    .map((project) => (

                      <div
                        className="evidence-project"
                        key={project.id}
                      >

                        <BriefcaseBusiness
                          size={14}
                        />

                        <div>

                          <span>
                            {project.name}
                          </span>

                          <small>
                            {project.evidence}
                          </small>

                        </div>

                      </div>

                    ))}

                </div>

              ))}

          </div>

        </section>

      </div>

      {/* RESOURCES */}

      <section className="panel resources-panel">

        <div className="panel-header">

          <div>

            <p className="eyebrow">
              NEXT ACTIONS
            </p>

            <h3>
              Resources for your missing skills
            </h3>

          </div>

          <button
            className="secondary-button"
            onClick={openGraph}
          >
            <Network size={16} />
            Open graph
          </button>

        </div>

        {resources.length ? (

          <div className="resource-grid">

            {resources.map((group) => (

              <div
                className="resource-card"
                key={group.skillId}
              >

                <div className="resource-skill">
                  {group.skill}
                </div>

                {group.resources.map(
                  (resource) => (

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                      key={resource.id}
                    >

                      <div className="resource-icon">
                        <BookOpen size={16} />
                      </div>

                      <div>

                        <strong>
                          {resource.title}
                        </strong>

                        <span>
                          {resource.type} ·{" "}
                          {resource.difficulty}
                        </span>

                      </div>

                      <ArrowRight size={15} />

                    </a>

                  )
                )}

              </div>

            ))}

          </div>

        ) : (

          <EmptyState
            title="No learning resources found"
            message="This role has no mapped resources for its current gaps."
          />

        )}

      </section>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| GRAPH EXPLORER
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This is the only GraphExplorer component.
| Do NOT add another GraphExplorer below this function.
|
*/
function GraphExplorer({ role, graph, loading }) {
  if (loading || !role) {
    return <LoadingPanel />;
  }

  /*
   * ============================================================
   * GRAPH CONFIGURATION
   * ============================================================
   */

 const WIDTH = 1200;
const HEIGHT = 920;

const center = {
  x: 600,
  y: 560
};

  const nodes = [];
  const seen = new Set();

  /*
   * ============================================================
   * BUILD UNIQUE NODE LIST
   * ============================================================
   */

  graph.forEach((edge) => {
    const edgeNodes = [
      {
        id: edge.sourceId,
        type: edge.sourceType,
        name: edge.sourceName
      },
      {
        id: edge.targetId,
        type: edge.targetType,
        name: edge.targetName
      }
    ];

    edgeNodes.forEach((node) => {
      if (node.id && !seen.has(node.id)) {
        seen.add(node.id);
        nodes.push(node);
      }
    });
  });

  /*
   * ============================================================
   * SELECTED ROLE
   * ============================================================
   */

  const selectedRole =
    nodes.find((node) => node.id === role.id) || {
      id: role.id,
      type: "Role",
      name: role.name
    };

  /*
   * ============================================================
   * GROUP NODES
   * ============================================================
   */

  const remaining = nodes.filter(
    (node) => node.id !== role.id
  );

  const skills = remaining.filter(
    (node) => node.type === "Skill"
  );

  const projects = remaining.filter(
    (node) => node.type === "Project"
  );

  const companies = remaining.filter(
    (node) => node.type === "Company"
  );

  const otherRoles = remaining.filter(
    (node) => node.type === "Role"
  );

  /*
   * ============================================================
   * POSITIONED NODES
   * ============================================================
   */

  const positioned = [];

  /*
   * ------------------------------------------------------------
   * SELECTED ROLE
   * ------------------------------------------------------------
   */

  positioned.push({
    ...selectedRole,
    x: center.x,
    y: center.y
  });

  /*
   * ------------------------------------------------------------
   * RELATED ROLES
   * LEFT COLUMN
   * ------------------------------------------------------------
   */

  const roleX = 120;
  const roleStartY = 115;
  const roleGap = 125;

  otherRoles.forEach((node, index) => {
    positioned.push({
      ...node,
      x: roleX,
      y: roleStartY + index * roleGap
    });
  });

  /*
 * ------------------------------------------------------------
 * SKILLS
 *
 * Skills are kept in the upper section.
 * The lower-middle area is deliberately reserved for the
 * selected role so nodes never overlap it.
 * ------------------------------------------------------------
 */

const skillColumns = 6;
const skillXGap = 125;
const skillYGap = 105;

const skillYStart = 90;

skills.forEach((node, index) => {
  const row = Math.floor(index / skillColumns);
  const column = index % skillColumns;

  const itemsInRow = Math.min(
    skillColumns,
    skills.length - row * skillColumns
  );

  const rowWidth =
    (itemsInRow - 1) * skillXGap;

  const rowStartX =
    center.x - rowWidth / 2;

  positioned.push({
    ...node,
    x: rowStartX + column * skillXGap,
    y: skillYStart + row * skillYGap
  });
});

  /*
   * ------------------------------------------------------------
   * COMPANIES
   * RIGHT COLUMN
   * ------------------------------------------------------------
   */

  const companyX = 1070;
  const companyStartY = 145;
  const companyGap = 130;

  companies.forEach((node, index) => {
    positioned.push({
      ...node,
      x: companyX,
      y: companyStartY + index * companyGap
    });
  });

  /*
   * ------------------------------------------------------------
   * PROJECTS
   * BOTTOM
   * ------------------------------------------------------------
   */

  const projectY = 835;
  const projectGap = 155;

  projects.forEach((node, index) => {
    const totalWidth =
      Math.max(projects.length - 1, 0) * projectGap;

    const projectStartX =
      center.x - totalWidth / 2;

    positioned.push({
      ...node,
      x: projectStartX + index * projectGap,
      y: projectY
    });
  });

  /*
   * ============================================================
   * POSITION MAP
   * ============================================================
   */

  const positionMap = new Map(
    positioned.map((node) => [node.id, node])
  );

  /*
   * ============================================================
   * RELATIONSHIP HELPERS
   * ============================================================
   */

  const normalizeRelationship = (relationship) => {
    return String(relationship || "")
      .replaceAll("_", "-")
      .toLowerCase();
  };

  const relationshipLabel = (relationship) => {
    return String(relationship || "")
      .replaceAll("_", " ")
      .replaceAll("-", " ")
      .toUpperCase();
  };

  /*
   * Only show relationship labels when the edge is directly
   * connected to the selected role.
   *
   * This removes the huge amount of overlapping text from the
   * previous graph.
   */

  const isSelectedRoleEdge = (edge) => {
    return (
      edge.sourceId === selectedRole.id ||
      edge.targetId === selectedRole.id
    );
  };

  /*
   * ============================================================
   * NODE RADIUS
   * ============================================================
   */

  const getNodeRadius = (node) => {
    if (node.id === selectedRole.id) {
      return 72;
    }

    if (node.type === "Company") {
      return 45;
    }

    if (node.type === "Project") {
      return 45;
    }

    if (node.type === "Role") {
      return 48;
    }

    return 45;
  };

  /*
   * ============================================================
   * TRUNCATE LONG NAMES
   * ============================================================
   */

  const truncateName = (name, maxLength = 20) => {
    if (!name) return "";

    return name.length > maxLength
      ? `${name.slice(0, maxLength - 1)}…`
      : name;
  };

  /*
   * ============================================================
   * EDGE LABEL POSITION
   * ============================================================
   */

  const getEdgeLabelPosition = (source, target) => {
    return {
      x: (source.x + target.x) / 2,
      y: (source.y + target.y) / 2 - 7
    };
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="content">

      {/* ======================================================
          GRAPH HEADER
          ====================================================== */}

      <section className="graph-intro">
        <div>
          <p className="eyebrow">
            CAREER GRAPH
          </p>

          <h2>
            Explore the graph behind the recommendation.
          </h2>

          <p>
            The selected role is connected to relevant skills,
            projects, companies and related career paths.
            Relationship labels are shown only for direct
            connections to the selected role.
          </p>
        </div>

        <div className="graph-legend">
          <Legend type="Role" />
          <Legend type="Skill" />
          <Legend type="Company" />
          <Legend type="Project" />
        </div>
      </section>

      {/* ======================================================
          GRAPH
          ====================================================== */}

      <section className="graph-panel">

        {positioned.length ? (

          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="graph-svg"
            role="img"
            aria-label="Career relationship graph"
          >

            {/* =================================================
                SECTION LABELS
                ================================================= */}

            <text
              x="120"
              y="55"
              className="graph-section-label"
            >
              RELATED ROLES
            </text>

            <text
              x="600"
              y="55"
              textAnchor="middle"
              className="graph-section-label"
            >
              SKILLS
            </text>

            <text
              x="1070"
              y="85"
              textAnchor="middle"
              className="graph-section-label"
            >
              COMPANIES
            </text>

            <text
              x="600"
              y="895"
              textAnchor="middle"
              className="graph-section-label"
            >
              PROJECT EVIDENCE
            </text>

            {/* =================================================
                EDGES
                ================================================= */}

            {graph.map((edge, index) => {

              const source = positionMap.get(
                edge.sourceId
              );

              const target = positionMap.get(
                edge.targetId
              );

              if (!source || !target) {
                return null;
              }

              const relationship =
                normalizeRelationship(
                  edge.relationship
                );

              const sourceIsSelected =
                edge.sourceId === selectedRole.id;

              const targetIsSelected =
                edge.targetId === selectedRole.id;

              const directConnection =
                sourceIsSelected ||
                targetIsSelected;

              const labelPosition =
                getEdgeLabelPosition(
                  source,
                  target
                );

              return (
                <g
                  key={`${edge.sourceId}-${edge.targetId}-${index}`}
                >

                  {/* EDGE */}

                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    className={`graph-edge ${relationship}`}
                  />

                  {/* =================================================
                      EDGE LABEL
                      Only direct selected-role relationships.
                      ================================================= */}

                  {isSelectedRoleEdge(edge) && (
                    <g>

                      <rect
                        x={labelPosition.x - 38}
                        y={labelPosition.y - 10}
                        width="76"
                        height="16"
                        rx="5"
                        className="edge-label-bg"
                      />

                      <text
                        x={labelPosition.x}
                        y={labelPosition.y + 1}
                        className="edge-label"
                      >
                        {relationshipLabel(
                          edge.relationship
                        )}
                      </text>

                    </g>
                  )}

                </g>
              );
            })}

            {/* =================================================
                NODES
                ================================================= */}

            {positioned.map((node) => {

              const isSelected =
                node.id === selectedRole.id;

              const radius =
                getNodeRadius(node);

              return (
                <g
                  key={node.id}
                  className="graph-node-group"
                >

                  {/* NODE CIRCLE */}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    className={
                      isSelected
                        ? "graph-node graph-node-center"
                        : `graph-node ${String(
                            node.type || ""
                          ).toLowerCase()}`
                    }
                  />

                  {/* =================================================
                      NODE TYPE
                      ================================================= */}

                  <text
                    x={node.x}
                    y={
                      node.y -
                      (isSelected ? 12 : 5)
                    }
                    className={
                      isSelected
                        ? "selected-node-type"
                        : "node-type"
                    }
                  >
                    {isSelected
                      ? "SELECTED ROLE"
                      : node.type}
                  </text>

                  {/* =================================================
                      NODE NAME
                      ================================================= */}

                  <text
                    x={node.x}
                    y={
                      node.y +
                      (isSelected ? 16 : 13)
                    }
                    className={
                      isSelected
                        ? "selected-node-name"
                        : "node-name"
                    }
                  >
                    {truncateName(
                      node.name,
                      isSelected ? 22 : 18
                    )}
                  </text>

                </g>
              );
            })}

          </svg>

        ) : (

          <EmptyState
            title="Graph neighborhood is empty"
            message="Seed the database and refresh the application."
          />

        )}

      </section>

    </div>
  );
}
function Legend({ type }) {
  return (
    <span className="legend-item">

      <i
        className={`legend-dot ${type.toLowerCase()}`}
      />

      {type}

    </span>
  );
}


/*
|--------------------------------------------------------------------------
| METRIC
|--------------------------------------------------------------------------
*/

function Metric({
  icon,
  label,
  value
}) {
  return (
    <div className="metric-card">

      <div className="metric-icon">
        {icon}
      </div>

      <div>

        <strong>
          {value}
        </strong>

        <span>
          {label}
        </span>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| LOADING SCREEN
|--------------------------------------------------------------------------
*/

function LoadingScreen() {
  return (
    <div className="loading-screen">

      <LoaderCircle
        className="spin"
        size={30}
      />

      <strong>
        Loading career graph
      </strong>

      <span>
        Connecting to CognoDB…
      </span>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| LOADING PANEL
|--------------------------------------------------------------------------
*/

function LoadingPanel() {
  return (
    <div className="loading-panel">

      <LoaderCircle
        className="spin"
        size={26}
      />

      <span>
        Traversing the graph…
      </span>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyState({
  title,
  message
}) {
  return (
    <div className="empty-state">

      <GraduationCap size={25} />

      <strong>
        {title}
      </strong>

      <span>
        {message}
      </span>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

export default App;