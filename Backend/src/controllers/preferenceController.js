import Preference from '../models/Preference.js';
import { generateRecommendations } from '../openaiService.js';

/**
 * Crea una nueva preferencia y genera recomendaciones
 */
export const createPreference = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    // Validar datos requeridos
    if (!userId) {
      return res.status(400).json({ 
        error: 'El campo userId es requerido' 
      });
    }

    if (!preferences) {
      return res.status(400).json({ 
        error: 'El campo preferences es requerido' 
      });
    }

    // Generar recomendaciones usando OpenAI
    let recomendaciones = [];
    try {
      recomendaciones = await generateRecommendations(preferences);
    } catch (openaiError) {
      console.error('Error en OpenAI:', openaiError);
      return res.status(500).json({ 
        error: 'Error al generar recomendaciones', 
        details: openaiError.message 
      });
    }

    // Crear y guardar la preferencia en MongoDB
    const newPreference = new Preference({
      userId,
      preferences,
      recomendaciones
    });

    const savedPreference = await newPreference.save();

    // Devolver respuesta exitosa
    res.status(201).json({
      message: 'Preferencias guardadas y recomendaciones generadas exitosamente',
      id: savedPreference._id,
      recomendaciones: savedPreference.recomendaciones
    });

  } catch (error) {
    console.error('❌ Error en createPreference:', error);
    res.status(500).json({ 
      error: 'Error al procesar las preferencias', 
      details: error.message 
    });
  }
};

/**
 * Obtiene todas las preferencias de un usuario
 */
export const getUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    const preferences = await Preference.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      preferences
    });
  } catch (error) {
    console.error('❌ Error en getUserPreferences:', error);
    res.status(500).json({ 
      error: 'Error al obtener las preferencias', 
      details: error.message 
    });
  }
};

