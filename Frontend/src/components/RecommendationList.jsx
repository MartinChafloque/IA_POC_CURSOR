import './RecommendationList.css';

const RecommendationList = ({ recomendaciones, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="recommendation-list loading">
        <div className="spinner"></div>
        <p>Generando recomendaciones personalizadas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendation-list error">
        <h3>❌ Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!recomendaciones || recomendaciones.length === 0) {
    return (
      <div className="recommendation-list empty">
        <p>Completa el formulario para obtener recomendaciones personalizadas</p>
      </div>
    );
  }

  return (
    <div className="recommendation-list">
      <h2>✨ Recomendaciones Personalizadas</h2>
      <div className="recommendations-grid">
        {recomendaciones.map((recomendacion, index) => (
          <div key={index} className="recommendation-card">
            <div className="card-number">{index + 1}</div>
            <p className="recommendation-text">{recomendacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;

