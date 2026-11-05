const API_URL = import.meta.env.VITE_BASE_API_URL;

export async function loginApi(formData) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/v1/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }
  if (response.status === 400 || response.status === 401) {
    throw new Error("Usuario o contraseña incorrecta");
  }
  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }
  return await response.json();
}

export async function registerApi(formData) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/v1/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }
  const data = await response.json().catch(() => ({}));
  if (response.status !== 201) {
    const messages = Object.values(data).flat().join(" ");
    throw new Error(messages || "No se puede crear el usuario");
  }
  return data;
}

export async function getMeApi(token) {
  const response = await fetch(`${API_URL}/api/v1/auth/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Sesión no válida o expirada");
  }
  return await response.json();
}