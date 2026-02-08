# 🏗️ Arquitectura de Base de Datos - Daylo App
## Diseño Escalable con Firebase Firestore

---

## 📊 Esquema Entidad-Relación

```
┌─────────────────┐
│     USERS       │ (Colección Principal)
│─────────────────│
│ • email (PK)    │ ← Identificador único
│ • name          │
│ • avatar        │
│ • createdAt     │
│ • updatedAt     │
│ • settings      │
│ • streak        │
└─────────────────┘
        │
        │ 1:N
        │
        ├──────────────┬──────────────┬──────────────┬──────────────┐
        │              │              │              │              │
        ▼              ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ dailyEntries│ │activityHistory│ │  timeHistory │ │   tasks      │ │  reflections │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 🗂️ Colecciones de Firebase

### 1. **users** (Maestro de Usuarios)
```typescript
{
  // Documento ID = email del usuario
  "juan@gmail.com": {
    name: string,
    email: string,
    avatar: string | null,
    createdAt: Timestamp,
    updatedAt: Timestamp,
    settings: {
      notifications: boolean,
      theme: 'light' | 'dark',
      language: 'es' | 'en'
    },
    stats: {
      totalDays: number,
      currentStreak: number,
      longestStreak: number,
      totalActivities: number
    }
  }
}
```
**Propósito**: Información del perfil y configuración general  
**Clave**: `email` (único por usuario)  
**Índices**: `email`, `createdAt`

---

### 2. **dailyEntries** (Entradas Diarias)
```typescript
{
  // Documento ID = "{userEmail}_{YYYY-MM-DD}"
  "juan@gmail.com_2026-02-08": {
    id: string,
    userEmail: string, // FK → users
    date: string, // YYYY-MM-DD
    emotionalCheckIn: {
      feeling: string,
      needsToday: string,
      mentalNoise: string
    } | null,
    dayIntention: string | null,
    diaryNote: string,
    dayStory: {
       howStarted: string,
      mostSignificant: string,
      howClosing: string
    } | null,
    reflection: {
      highlights: string,
      mood: string,
      dayRating: number,
      improvement: string
    },
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}
```
**Propósito**: Entrada completa del día (check-in, notas, reflexiones)  
**Clave**: `{userEmail}_{date}` (un registro por día por usuario)  
**Índices**: `userEmail`, `date`, `updatedAt`  
**Relación**: N:1 con `users`

---

### 3. **activities** (Actividades del Día)
```typescript
{
  // Documento ID = auto-generado
  "activity_12345": {
    id: string,
    userEmail: string, // FK → users
    dailyEntryId: string, // FK → dailyEntries
    date: string, // YYYY-MM-DD
    activityIcon: 'work' | 'home' | 'exercise' | ...,
    activityLabel: string,
    duration: number, // minutos
    facets: {
      [key: string]: number | boolean
    },
    notes: string | null,
    energyImpact: 'drain' | 'neutral' | 'boost',
    createdAt: Timestamp,
    timestamp: Timestamp
  }
}
```
**Propósito**: Actividades registradas por el usuario (del día actual)  
**Índices**: `userEmail`, `dailyEntryId`, `date`, `timestamp`  
**Relación**: N:1 con `users`, N:1 con `dailyEntries`

---

### 4. **activityHistory** (Historial de Actividades)
```typescript
{
  // Documento ID = auto-generado
  "log_67890": {
    id: string,
    userEmail: string, // FK → users
    date: string, // YYYY-MM-DD
    activityIcon: string,
    activityLabel: string,
    duration: number,
    facets: object,
    notes: string | null,
    energyImpact: string,
    timestamp: Timestamp
  }
}
```
**Propósito**: Log histórico permanente de cada actividad (NUNCA se borra)  
**Índices**: `userEmail`, `date`, `timestamp`  
**Relación**: N:1 con `users`  
**Uso**: Dashboard, análisis, estadísticas

---

### 5. **timeHistory** (Registro de Horas)
```typescript
{
  // Documento ID = auto-generado
  "time_abcde": {
    id: string,
    userEmail: string, // FK → users
    date: string,
    activityIcon: string,
    activityLabel: string,
    duration: number,
    timestamp: Timestamp
  }
}
```
**Propósito**: Registro simplificado de horas trabajadas  
**Índices**: `userEmail`, `date`, `timestamp`  
**Uso**: Dashboard de tiempo, reportes

---

### 6. **tasks** (Tareas y Prioridades)
```typescript
{
  // Documento ID = auto-generado
  "task_xyz123": {
    id: string,
    userEmail: string, // FK → users
    dailyEntryId: string, // FK → dailyEntries
    date: string,
    text: string,
    completed: boolean,
    completedAt: Timestamp | null,
    isPriority: boolean, // máximo 3 por día
    isPersonal: boolean, // máximo 1 por día
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}
```
**Propósito**: Sistema de tareas (3 prioridades + 1 acción personal)  
**Índices**: `userEmail`, `dailyEntryId`, `date`, `isPriority`, `completed`

---

### 7. **reflections** (Reflexiones Nocturnas)
```typescript
{
  // Documento ID = "{userEmail}_{YYYY-MM-DD}"
  "juan@gmail.com_2026-02-08_reflection": {
    id: string,
    userEmail: string,
    date: string,
    highlights: string,
    mood: string,
    dayRating: number, // 1-5
    improvement: string,
    gratitude: string[],
    createdAt: Timestamp
  }
}
```
**Propósito**: Reflexión del cierre del día  
**Índices**: `userEmail`, `date`

---

## 🔗 Reglas de Integridad

### Foreign Keys (Relaciones)
- **userEmail** → Referencia a `users.email`
- **dailyEntryId** → Referencia a `dailyEntries.id`

### Constraints
- Un usuario puede tener **1 dailyEntry** por fecha
- Un dailyEntry puede tener **múltiples activities**
- Un usuario puede tener **máximo 3 prioridades** por día (`isPriority=true`)
- Un usuario puede tener **máximo 1 acción personal** por día (`isPersonal=true`)

---

## 📈 Consultas Optimizadas (Índices Compuestos)

### Firebase Firestore Indexes

1. **dailyEntries**
   ```
   userEmail ASC, date DESC
   ```

2. **activityHistory**
   ```
   userEmail ASC, date DESC, timestamp DESC
   ```

3. **timeHistory**
   ```
   userEmail ASC, date DESC
   ```

4. **tasks**
   ```
   userEmail ASC, dailyEntryId ASC, isPriority DESC
   userEmail ASC, date DESC, completed ASC
   ```

5. **activities**
   ```
   userEmail ASC, dailyEntryId ASC
   userEmail ASC, date DESC
   ```

---

## 🚀 Estrategia de Crecimiento

### Fase 1: MVP (Actual)
- ✅ CRUD básico de usuarios
- ✅ Entradas diarias
- ✅ Actividades
- ✅ Historial básico

### Fase 2: Analytics (Próximo)
- 📊 Dashboard con gráficos
- 📈 Tendencias semanales/mensuales
- 🎯 Insights automáticos
- 🔥 Sistema de streaks avanzado

### Fase 3: Social (Futuro)
- 👥 Compartir logros
- 🏆 Challenges grupales
- 💬 Comunidad
- 📱 Notificaciones push

### Fase 4: AI (Avanzado)
- 🤖 Recomendaciones personalizadas
- 📊 Análisis predictivo
- 🎨 Generación de insights
- 📝 Resúmenes automáticos

---

## 🛠️ Mejoras Técnicas Propuestas

### 1. **Seguridad**
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users solo pueden leer/escribir sus propios datos
    match /users/{email} {
      allow read, write: if request.auth != null && request.auth.token.email == email;
    }
    
    match /dailyEntries/{entryId} {
      allow read, write: if request.auth != null 
        && resource.data.userEmail == request.auth.token.email;
    }
    
    match /activityHistory/{logId} {
      allow read: if request.auth != null 
        && resource.data.userEmail == request.auth.token.email;
      allow write: if request.auth != null;
    }
  }
}
```

### 2. **Cache Strategy**
- **localStorage**: Cache de lectura rápida (< 100ms)
- **Firebase**: Fuente de verdad + sincronización
- **ServiceWorker**: Offline-first para PWA

### 3. **Paginación**
```typescript
// Para colecciones grandes
const getActivityHistory = async (userEmail: string, limit: number = 50) => {
  const q = query(
    collection(db, 'activityHistory'),
    where('userEmail', '==', userEmail),
    orderBy('timestamp', 'desc'),
    limit(limit)
  )
  return getDocs(q)
}
```

### 4. **Agregación para Dashboard**
```typescript
// Pre-calcular stats diarias
const dailyStats = {
  date: '2026-02-08',
  totalMinutes: 480,
  activitiesCount: 8,
  tasksCompleted: 5,
  moodAverage: 4.2
}
```

---

## 💾 Estructura Final en Firebase

```
Daylo
├── users/
│   ├── juan@gmail.com
│   ├── maria@gmail.com
│   └── ...
├── dailyEntries/
│   ├── juan@gmail.com_2026-02-08
│   ├── juan@gmail.com_2026-02-07
│   └── ...
├── activities/
│   ├── activity_12345 (trabajo, 120min)
│   ├── activity_67890 (ejercicio, 45min)
│   └── ...
├── activityHistory/ (PERMANENTE)
│   ├── log_abc (2026-02-08, trabajo)
│   ├── log_def (2026-02-07, estudio)
│   └── ...
├── timeHistory/ (PERMANENTE)
│   ├── time_123 (2026-02-08, 120min)
│   └── ...
├── tasks/
│   ├── task_xyz (prioridad: escribir reporte)
│   └── ...
└── reflections/
    ├── juan@gmail.com_2026-02-08_reflection
    └── ...
```

---

## ✅ Ventajas de esta Arquitectura

1. **Escalable**: Crece con millones de usuarios
2. **Performante**: Índices optimizados, cache inteligente
3. **Segura**: Reglas de Firestore + validación
4. **Mantenible**: Separación clara de responsabilidades
5. **Flexible**: Fácil agregar nuevas features
6. **Real-time**: Sincronización automática entre dispositivos
7. **Analítica**: Datos estructurados para dashboard

---

## 🎯 Próximos Pasos Recomendados

1. ✅ **Implementar reglas de seguridad** en Firebase
2. ✅ **Crear índices compuestos** en Firestore
3. ✅ **Agregar validación** en el backend
4. ⏳ **Implementar dashboard** con stats reales
5. ⏳ **Agregar paginación** en historial largo
6. ⏳ **Crear backups automáticos**
7. ⏳ **Agregar analytics** (Firebase Analytics o Mixpanel)

---

**Última actualización**: 8 de febrero de 2026  
**Versión**: 2.0  
**Estado**: En producción
