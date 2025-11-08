import { useState } from 'react';
import './PreferenceForm.css';

const PreferenceForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    userId: '',
    intereses: [],
    disponibilidad: '',
    tipo_experiencia: '',
    restricciones: ''
  });

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interesesOptions = [
    'aventura',
    'naturaleza',
    'cultura',
    'gastronomía',
    'playa',
    'montaña',
    'ciudad',
    'relajación',
    'deportes',
    'historia'
  ];

  const tipoExperienciaOptions = [
    'relajación',
    'aventura',
    'cultural',
    'familiar',
    'romántico',
    'solo viajero',
    'gastronómico'
  ];

  const handleInterestToggle = (interes) => {
    setSelectedInterests(prev => {
      if (prev.includes(interes)) {
        return prev.filter(i => i !== interes);
      } else {
        return [...prev, interes];
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.userId.trim()) {
      alert('Por favor, ingresa un ID de usuario');
      return;
    }

    const payload = {
      userId: formData.userId,
      preferences: {
        intereses: selectedInterests,
        disponibilidad: formData.disponibilidad,
        tipo_experiencia: formData.tipo_experiencia,
        restricciones: formData.restricciones
      }
    };

    onSubmit(payload);
  };

  return (
    <form className="preference-form" onSubmit={handleSubmit}>
      <h2>📝 Preferencias de Viaje</h2>
      
      <div className="form-group">
        <label htmlFor="userId">ID de Usuario *</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="Ej: 123"
          required
        />
      </div>

      <div className="form-group">
        <label>Intereses (selecciona uno o más)</label>
        <div className="interests-grid">
          {interesesOptions.map(interes => (
            <button
              key={interes}
              type="button"
              className={`interest-chip ${selectedInterests.includes(interes) ? 'active' : ''}`}
              onClick={() => handleInterestToggle(interes)}
            >
              {interes}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="disponibilidad">Tiempo Disponible</label>
        <input
          type="text"
          id="disponibilidad"
          name="disponibilidad"
          value={formData.disponibilidad}
          onChange={handleChange}
          placeholder="Ej: 5 días, 1 semana, 3 días"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipo_experiencia">Tipo de Experiencia</label>
        <select
          id="tipo_experiencia"
          name="tipo_experiencia"
          value={formData.tipo_experiencia}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          {tipoExperienciaOptions.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="restricciones">Restricciones o Consideraciones</label>
        <textarea
          id="restricciones"
          name="restricciones"
          value={formData.restricciones}
          onChange={handleChange}
          placeholder="Ej: sin vuelos largos, presupuesto limitado, accesibilidad requerida"
          rows="3"
        />
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? '⏳ Generando recomendaciones...' : '🚀 Obtener Recomendaciones'}
      </button>
    </form>
  );
};

export default PreferenceForm;
