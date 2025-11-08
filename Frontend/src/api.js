import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Envía las preferencias del usuario al backend
 * @param {Object} data - Datos de preferencias
 * @param {string} data.userId - ID del usuario
 * @param {Object} data.preferences - Objeto con preferencias
 * @returns {Promise<Object>} Respuesta con recomendaciones
 */
export const submitPreferences = async (data) => {
  try {
    const response = await api.post('/api/preferences', data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar preferencias:', error);
    throw error.response?.data || { error: 'Error al conectar con el servidor' };
  }
};

/**
 * Obtiene las preferencias históricas de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} Preferencias del usuario
 */
export const getUserPreferences = async (userId) => {
  try {
    const response = await api.get(`/api/preferences/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener preferencias:', error);
    throw error.response?.data || { error: 'Error al conectar con el servidor' };
  }
};

export default api;

