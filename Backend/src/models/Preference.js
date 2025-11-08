import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  preferences: {
    intereses: {
      type: [String],
      default: []
    },
    disponibilidad: {
      type: String,
      default: ''
    },
    tipo_experiencia: {
      type: String,
      default: ''
    },
    restricciones: {
      type: String,
      default: ''
    }
  },
  recomendaciones: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Preference = mongoose.model('Preference', preferenceSchema);

export default Preference;

