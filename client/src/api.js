const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    let message = "Request failed.";
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch {
      // Keep generic message.
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  health: () => request("/health"),
  candidate: () => request("/candidate"),
  roles: () => request("/roles"),
  role: (id) => request(`/roles/${id}`),
  gap: (id) => request(`/roles/${id}/gap`),
  evidence: (id) => request(`/roles/${id}/evidence`),
  resources: (id) => request(`/roles/${id}/resources`),
  careerPath: (id) => request(`/roles/${id}/career-path`),
  recommendations: () => request("/recommendations"),
  graph: (id) => request(`/graph/${id}`)
};
