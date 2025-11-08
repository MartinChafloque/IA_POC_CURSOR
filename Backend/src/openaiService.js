import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Genera recomendaciones personalizadas usando OpenAI
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Promise<Array>} Array de recomendaciones
 */
export const generateRecommendations = async (preferences) => {
  try {
    const { intereses, disponibilidad, tipo_experiencia, restricciones } = preferences;

    const prompt = `Eres un experto en turismo y viajes en Colombia. 
    
Basándote en las siguientes preferencias del cliente, genera 3-5 recomendaciones de experiencias turísticas personalizadas y viables:

- Intereses: ${intereses.join(', ') || 'No especificados'}
- Disponibilidad: ${disponibilidad || 'No especificada'}
- Tipo de experiencia deseada: ${tipo_experiencia || 'No especificada'}
- Restricciones: ${restricciones || 'Ninguna'}

Genera recomendaciones específicas, realistas y detalladas. Cada recomendación debe ser una descripción breve pero completa (1-2 oraciones) que incluya el lugar, la duración sugerida y el tipo de experiencia.

Responde SOLO con un array JSON de strings, sin texto adicional. Ejemplo de formato:
["Recomendación 1", "Recomendación 2", "Recomendación 3"]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente experto en turismo colombiano. Responde siempre con arrays JSON válidos de strings.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const responseContent = completion.choices[0].message.content.trim();
    
    // Intentar parsear la respuesta como JSON
    let recomendaciones = [];
    try {
      // Limpiar la respuesta si tiene markdown code blocks
      const cleanedContent = responseContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      recomendaciones = JSON.parse(cleanedContent);
      
      // Asegurar que sea un array
      if (!Array.isArray(recomendaciones)) {
        recomendaciones = [recomendaciones];
      }
    } catch (parseError) {
      // Si no es JSON válido, intentar extraer recomendaciones del texto
      console.warn('⚠️ No se pudo parsear como JSON, extrayendo del texto:', parseError);
      const lines = responseContent.split('\n').filter(line => line.trim().length > 0);
      recomendaciones = lines.map(line => line.replace(/^[-•*]\s*/, '').replace(/^"\s*/, '').replace(/"\s*$/, '').trim()).filter(r => r.length > 0);
      
      if (recomendaciones.length === 0) {
        recomendaciones = ['No se pudieron generar recomendaciones en este momento. Por favor, intenta con más detalles en tus preferencias.'];
      }
    }

    return recomendaciones;
  } catch (error) {
    console.error('❌ Error al generar recomendaciones con OpenAI:', error.message);
    throw new Error('Error al generar recomendaciones: ' + error.message);
  }
};

