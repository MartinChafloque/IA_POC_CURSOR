import { useState } from 'react';
import PreferenceForm from '../components/PreferenceForm';
import RecommendationList from '../components/RecommendationList';
import { submitPreferences } from '../api';
import './Home.css';

const Home = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setRecomendaciones([]);

    try {
      const response = await submitPreferences(formData);
      
      if (response.recomendaciones && Array.isArray(response.recomendaciones)) {
        setRecomendaciones(response.recomendaciones);
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.error || err.message || 'Error al obtener recomendaciones. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header className="app-header">
        <h1>🌴 Preferencias de Viajes</h1>
        <p className="subtitle">Descubre experiencias turísticas personalizadas para ti</p>
      </header>

      <div className="content-wrapper">
        <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />
        <RecommendationList 
          recomendaciones={recomendaciones}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Home;
