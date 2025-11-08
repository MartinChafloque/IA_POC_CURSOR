import express from 'express';
import { createPreference, getUserPreferences } from '../controllers/preferenceController.js';

const router = express.Router();

// POST /api/preferences - Crear preferencias y generar recomendaciones
router.post('/', createPreference);

// GET /api/preferences/:userId - Obtener preferencias de un usuario
router.get('/:userId', getUserPreferences);

export default router;

