
// La API de tu amigo solo para el Mapa
const BASE_URL = "http://192.168.137.246/Baston2/php"; 

const fetchConTimeout = (url, opciones = {}, segundos = 8) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), segundos * 1000);
  return fetch(url, { ...opciones, signal: controller.signal })
    .finally(() => clearTimeout(timer));
};

// --- MANTIENE TU LOGIN ORIGINAL ---
export const login = async (usuario, password) => {
  try {
    const res = await fetchConTimeout(`${BASE_URL}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, mensaje: "Sin conexión al servidor" };
  }
};

// --- MANTIENE TUS ALERTAS ORIGINALES ---
export const getAlertas = async (limit = 50) => {
  try {
    const res = await fetchConTimeout(`${BASE_URL}/alertas.php?limit=${limit}`);
    return await res.json();
  } catch (e) {
    return [];
  }
};

// --- USA LA UBICACIÓN DE TU AMIGO ---
export const getEstadisticas = async () => {
  try {
    // Apuntamos a la IP .246 de tu amigo
    const res = await fetchConTimeout(`${BASE_URL}/posiciones_get.php`);
    const respuesta = await res.json();

    if (respuesta.ok) {
      // Adaptamos el formato de tu amigo al que espera tu pantalla de Mapa
      return {
        conteo: {}, // Opcional: puedes dejarlo vacío por ahora
        ubicacion: {
          latitud: respuesta.data.latitud,
          longitud: respuesta.data.longitud
        }
      };
    }
    return { conteo: {}, ubicacion: null };
  } catch (e) {
    console.log("Error obteniendo ubicación de amigo:", e);
    return { conteo: {}, ubicacion: null };
  }
};