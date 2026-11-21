const API_URL = import.meta.env.VITE_API_URL || "";

export async function useFetch(endpoint, options = {}) {
  if (!endpoint) return null;

  const response = await fetch(`${API_URL}${endpoint}`, options);

  return await response.json();
}
