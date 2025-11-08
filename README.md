# 🌴 Módulo de Preferencias Personalizadas para App de Reservas de Viajes

Aplicación web full-stack que permite a los usuarios ingresar sus preferencias de viaje y recibir recomendaciones personalizadas de experiencias turísticas generadas mediante inteligencia artificial.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [API Endpoints](#-api-endpoints)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Troubleshooting](#-troubleshooting)

## 🎯 Descripción

Este proyecto permite a los usuarios:

- **Registrar preferencias de viaje**: Intereses, tiempo disponible, tipo de experiencia deseada y restricciones personales
- **Obtener recomendaciones personalizadas**: Generadas mediante OpenAI GPT-4o-mini basadas en las preferencias del usuario
- **Almacenar historial**: Las preferencias se guardan en MongoDB Atlas para consultas futuras

## ✨ Características

- 🎨 **Interfaz moderna y responsive** con diseño atractivo
- 🤖 **Recomendaciones inteligentes** generadas por IA
- 💾 **Persistencia de datos** en MongoDB Atlas
- 🔄 **Comunicación en tiempo real** entre frontend y backend
- ✅ **Validación de formularios** en el cliente
- 🎯 **Manejo de errores** robusto

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL (MongoDB Atlas)
- **Mongoose** - ODM para MongoDB
- **OpenAI API** - Generación de recomendaciones con GPT-4o-mini
- **CORS** - Habilitación de comunicación cross-origin
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP para peticiones API
- **CSS3** - Estilos modernos con gradientes y animaciones

## 📁 Estructura del Proyecto

```
POC Proyecto 1/
│
├── Backend/                    # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # Configuración de MongoDB
│   │   ├── controllers/
│   │   │   └── preferenceController.js  # Lógica de negocio
│   │   ├── models/
│   │   │   └── Preference.js  # Modelo de datos MongoDB
│   │   ├── routes/
│   │   │   └── preferenceRoutes.js  # Definición de rutas
│   │   ├── openaiService.js   # Servicio de integración OpenAI
│   │   └── server.js          # Punto de entrada del servidor
│   ├── package.json
│   └── .env                   # Variables de entorno (no versionado)
│
└── Frontend/                  # Aplicación React
    ├── src/
    │   ├── components/
    │   │   ├── PreferenceForm.jsx      # Formulario de preferencias
    │   │   ├── PreferenceForm.css
    │   │   ├── RecommendationList.jsx  # Lista de recomendaciones
    │   │   └── RecommendationList.css
    │   ├── pages/
    │   │   ├── Home.jsx       # Página principal
    │   │   └── Home.css
    │   ├── api.js             # Servicio de comunicación con backend
    │   ├── App.jsx            # Componente raíz
    │   ├── App.css
    │   ├── main.jsx           # Punto de entrada
    │   └── index.css          # Estilos globales
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env                   # Variables de entorno (no versionado)
```

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar Node.js](https://nodejs.org/)
- **npm** (viene incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)
- **Cuenta de MongoDB Atlas** (ya configurada en el proyecto)
- **API Key de OpenAI** (ya configurada en el proyecto)

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

Si tienes el proyecto en un repositorio Git:
```bash
git clone <url-del-repositorio>
cd "POC Proyecto 1"
```

### 2. Instalar dependencias del Backend

**⚠️ IMPORTANTE: Este paso es obligatorio antes de ejecutar el servidor.**

```bash
cd Backend
npm install
```

Esto instalará las siguientes dependencias:
- express
- mongoose
- cors
- dotenv
- openai

**Verificación:** Después de ejecutar `npm install`, deberías ver una carpeta `node_modules` creada en el directorio Backend. Si no aparece, verifica que npm esté correctamente instalado (ver sección [Troubleshooting](#-troubleshooting)).

### 3. Instalar dependencias del Frontend

**⚠️ IMPORTANTE: Este paso es obligatorio antes de ejecutar el frontend.**

Abre una nueva terminal y ejecuta:

```bash
cd Frontend
npm install
```

Esto instalará las siguientes dependencias:
- react
- react-dom
- axios
- vite
- @vitejs/plugin-react

**Verificación:** Después de ejecutar `npm install`, deberías ver una carpeta `node_modules` creada en el directorio Frontend.

## ⚙️ Configuración

### Variables de Entorno

Los archivos `.env` ya están creados con las configuraciones necesarias. Si necesitas modificarlos:

#### Backend (.env)

Ubicación: `Backend/.env`

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?appName=AppAnalisisTour
PORT=3001
OPENAI_API_KEY=sk-proj-tu-api-key-aqui
```

**⚠️ IMPORTANTE - Seguridad:**
- **NUNCA** subas credenciales reales a repositorios públicos
- Reemplaza los valores de ejemplo con tus credenciales reales:
  - `usuario:password` → Tu usuario y contraseña de MongoDB Atlas
  - `sk-proj-tu-api-key-aqui` → Tu API key de OpenAI
- Las credenciales reales deben estar **SOLO** en los archivos `.env` (que están en `.gitignore`)

#### Frontend (.env)

Ubicación: `Frontend/.env`

```env
VITE_API_URL=http://localhost:3001
```

**Nota**: Si cambias el puerto del backend, actualiza también `VITE_API_URL` en el frontend.

## ▶️ Ejecución

### Opción 1: Ejecutar en terminales separadas (Recomendado)

#### Terminal 1 - Backend

```bash
cd Backend
node src/server.js
```

Deberías ver:
```
✅ MongoDB conectado exitosamente
🚀 Servidor corriendo en http://localhost:3001
📡 Endpoint de preferencias: http://localhost:3001/api/preferences
```

#### Terminal 2 - Frontend

```bash
cd Frontend
npm run dev
```

Deberías ver:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Opción 2: Modo desarrollo con watch (Backend)

Para que el backend se reinicie automáticamente al hacer cambios:

```bash
cd Backend
node --watch src/server.js
```

### Acceder a la aplicación

Abre tu navegador y visita:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🔌 API Endpoints

### POST /api/preferences

Crea nuevas preferencias y genera recomendaciones.

**Request Body:**
```json
{
  "userId": "123",
  "preferences": {
    "intereses": ["aventura", "naturaleza"],
    "disponibilidad": "5 días",
    "tipo_experiencia": "relajación",
    "restricciones": "sin vuelos largos"
  }
}
```

**Response (201 Created):**
```json
{
  "message": "Preferencias guardadas y recomendaciones generadas exitosamente",
  "id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "recomendaciones": [
    "Tour ecológico en el Eje Cafetero por 5 días",
    "Retiro de bienestar en Villa de Leyva",
    "Aventura en el Parque Nacional Tayrona"
  ]
}
```

**Errores posibles:**
- `400 Bad Request`: Faltan campos requeridos (userId o preferences)
- `500 Internal Server Error`: Error al generar recomendaciones o guardar en BD

### GET /api/preferences/:userId

Obtiene el historial de preferencias de un usuario.

**Response (200 OK):**
```json
{
  "preferences": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "userId": "123",
      "preferences": {
        "intereses": ["aventura", "naturaleza"],
        "disponibilidad": "5 días",
        "tipo_experiencia": "relajación",
        "restricciones": "sin vuelos largos"
      },
      "recomendaciones": ["...", "..."],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### GET /health

Endpoint de salud del servidor.

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Usuario busca aventura y naturaleza

**Formulario:**
- ID Usuario: `user_001`
- Intereses: `aventura`, `naturaleza`
- Disponibilidad: `7 días`
- Tipo de experiencia: `aventura`
- Restricciones: `presupuesto medio`

**Resultado esperado:**
Recomendaciones de tours de aventura en parques naturales colombianos.

### Ejemplo 2: Usuario busca relajación

**Formulario:**
- ID Usuario: `user_002`
- Intereses: `playa`, `relajación`
- Disponibilidad: `3 días`
- Tipo de experiencia: `relajación`
- Restricciones: `sin vuelos largos`

**Resultado esperado:**
Recomendaciones de destinos de playa cercanos para relajación.

### Probar con cURL

```bash
# Crear preferencias
curl -X POST http://localhost:3001/api/preferences \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "123",
    "preferences": {
      "intereses": ["aventura", "naturaleza"],
      "disponibilidad": "5 días",
      "tipo_experiencia": "relajación",
      "restricciones": "sin vuelos largos"
    }
  }'

# Obtener preferencias de un usuario
curl http://localhost:3001/api/preferences/123
```

## 🔧 Troubleshooting

### Problema: Error "Cannot find package 'express'" o módulos no encontrados

**Síntomas:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from ...
```

**Causa:** Las dependencias de Node.js no están instaladas.

**Solución:**

1. **Verifica que npm esté instalado:**
   ```bash
   node --version
   npm --version
   ```

2. **Si npm no está disponible, reinstala Node.js:**
   - Descarga Node.js desde [nodejs.org](https://nodejs.org/)
   - Asegúrate de seleccionar la opción "Add to PATH" durante la instalación
   - Reinicia tu terminal después de instalar

3. **Instala las dependencias del Backend:**
   ```bash
   cd Backend
   npm install
   ```
   
   Deberías ver algo como:
   ```
   added 150 packages, and audited 151 packages in 10s
   ```

4. **Verifica que se creó la carpeta `node_modules`:**
   ```bash
   # Windows PowerShell
   Test-Path node_modules
   # Debe retornar: True
   ```

5. **Si npm no funciona en PowerShell, intenta:**
   - Abrir una nueva terminal como Administrador
   - Usar Command Prompt (cmd) en lugar de PowerShell
   - Reiniciar tu computadora para actualizar las variables de entorno

6. **Instala también las dependencias del Frontend:**
   ```bash
   cd Frontend
   npm install
   ```

**Nota importante:** Debes ejecutar `npm install` en ambos directorios (Backend y Frontend) antes de intentar ejecutar el proyecto.

### Problema: El backend no se conecta a MongoDB

**Solución:**
1. Verifica que la URI de MongoDB en `.env` sea correcta
2. Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
3. Verifica tu conexión a internet

### Problema: Error 401 al llamar a OpenAI

**Solución:**
1. Verifica que la API key de OpenAI en `.env` sea válida
2. Asegúrate de que la API key tenga créditos disponibles
3. Verifica que no haya espacios extra en la variable de entorno

### Problema: CORS error en el frontend

**Solución:**
1. Verifica que el backend esté corriendo en el puerto 3001
2. Asegúrate de que `VITE_API_URL` en el frontend apunte al puerto correcto
3. Verifica que CORS esté habilitado en `server.js`

### Problema: El frontend no se conecta al backend

**Solución:**
1. Verifica que ambos servidores estén corriendo
2. Verifica que `VITE_API_URL` en `Frontend/.env` sea `http://localhost:3001`
3. Abre las herramientas de desarrollador (F12) y revisa la consola para errores
4. Verifica que no haya un firewall bloqueando la conexión

### Problema: Puerto ya en uso

**Solución:**
```bash
# Windows - Encontrar proceso usando el puerto 3001
netstat -ano | findstr :3001

# Matar el proceso (reemplaza PID con el número encontrado)
taskkill /PID <PID> /F
```

### Problema: Las recomendaciones no se generan

**Solución:**
1. Verifica los logs del backend para ver el error específico
2. Asegúrate de que la API key de OpenAI sea válida
3. Verifica que el formato de las preferencias sea correcto
4. Revisa que OpenAI esté respondiendo (puede haber límites de rate)

## 📝 Notas Adicionales

- **MongoDB Atlas**: El proyecto usa una base de datos en la nube. No necesitas instalar MongoDB localmente.
- **OpenAI API**: Las recomendaciones se generan en tiempo real usando GPT-4o-mini. Cada solicitud consume créditos de la API.
- **Puertos**: El backend usa el puerto 3001 y el frontend el 3000 por defecto. Puedes cambiarlos en los archivos de configuración.
- **Modo desarrollo**: El frontend con Vite tiene hot-reload automático. Los cambios se reflejan inmediatamente.

## 🎓 Próximos Pasos

Posibles mejoras para el proyecto:

- [ ] Autenticación de usuarios
- [ ] Historial de recomendaciones por usuario
- [ ] Sistema de favoritos
- [ ] Filtros avanzados de búsqueda
- [ ] Integración con APIs de reservas reales
- [ ] Panel de administración
- [ ] Tests unitarios y de integración
- [ ] Dockerización del proyecto

## 📄 Licencia

Este proyecto es un POC (Proof of Concept) para fines educativos.

## 👥 Autor

Proyecto desarrollado como parte del módulo de preferencias personalizadas para app de reservas de viajes.

---

**¡Disfruta explorando las recomendaciones de viaje personalizadas! 🌴✈️**

