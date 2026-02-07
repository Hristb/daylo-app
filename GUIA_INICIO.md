# Guía de Inicio Rápido - Daylo

## 🚀 Instalación Rápida

### 1. Instalar dependencias

```bash
cd daylo-app
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Uso de la Aplicación

### Primera Vez

1. **Página "Hoy"**: Verás la interfaz principal para registrar tu día
2. **Selecciona actividades**: Tap en los iconos de las actividades que realizaste
3. **Ajusta tiempos**: Usa los sliders para indicar cuánto tiempo dedicaste
4. **Reflexiona**: Selecciona tu mood y escribe algo breve que rescates del día
5. **Guarda**: Presiona "Guardar mi día"

### Ver Dashboard

1. Navega a la pestaña "Dashboard" en la parte inferior
2. Verás gráficos y estadísticas de tus días registrados
3. Analiza patrones y obtén insights sobre tu vida

## 🎨 Personalización

### Modificar Colores Pastel

Edita `tailwind.config.js`:

```js
colors: {
  pastel: {
    pink: '#FFD4E5',      // Cambia estos valores
    blue: '#C4E5FF',
    purple: '#E8D4FF',
    green: '#D4FFE5',
    peach: '#FFE5D4',
    yellow: '#FFF4D4',
  },
}
```

### Agregar Nuevas Actividades

Edita `src/utils/constants.ts` y agrega a `ACTIVITY_OPTIONS`:

```typescript
{
  id: 'tu-actividad',
  label: 'Tu Actividad',
  color: '#TuColor',
  defaultDuration: 60, // minutos
}
```

### Cambiar Iconos

Los iconos vienen de `lucide-react`. Edita `src/components/icons/ActivityIcon.tsx` y agrega tu icono al `iconMap`.

## 🔧 Scripts Disponibles

```bash
npm run dev       # Desarrollo (puerto 3000)
npm run build     # Build para producción
npm run preview   # Preview del build
npm run lint      # Linter
```

## 📦 Estructura de Datos

Los datos se guardan en `localStorage` bajo la key `daylo-entries`:

```json
{
  "id": "timestamp",
  "date": "ISO date string",
  "activities": [
    {
      "id": "activity-id",
      "icon": "work",
      "label": "Trabajo",
      "duration": 480,
      "color": "#C4E5FF"
    }
  ],
  "reflection": {
    "highlights": "Tu texto",
    "mood": "😊"
  }
}
```

## 🐛 Troubleshooting

### El servidor no inicia

```bash
# Limpia node_modules y reinstala
rm -rf node_modules
npm install
```

### Errores de TypeScript

```bash
# Regenera archivos de TypeScript
npm run build
```

### Puerto 3000 ocupado

Edita `vite.config.ts` y cambia el puerto:

```typescript
server: {
  port: 3001, // Cambia aquí
}
```

## 📚 Recursos

- [Documentación Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)
- [Zustand](https://github.com/pmndrs/zustand)

## 🎯 Próximos Pasos

1. Usa la app durante una semana para ver el dashboard poblado
2. Experimenta con los colores y personalización
3. ¡Comparte feedback!

---

**¿Preguntas?** Abre un issue en GitHub o consulta el README.md principal.
