# 🌟 Daylo - Tu Libreta de Vida

> *Ilumina tu día, descubre tu vida*

## ✨ ¿Qué es Daylo?

Daylo es una aplicación personal de bienestar que te permite documentar tu día en solo **2-3 minutos** mediante interacciones visuales y gamificadas. A diferencia de los diarios tradicionales, Daylo utiliza iconos animados estilo Duolingo, sliders de tiempo y reflexiones guiadas para que registrar tu día sea rápido, divertido y revelador.

### 🎯 Características Principales

- ✅ **Iconos Seleccionables**: No escribas, solo selecciona las actividades de tu día
- ⏱️ **Sliders de Tiempo**: Registra visualmente cuánto tiempo dedicaste a cada área
- 💭 **Reflexiones Breves**: Preguntas guiadas para capturar lo esencial
- 📊 **Dashboard Semanal**: Visualiza patrones y obtén insights sobre tu vida
- 🎨 **Diseño Pastel**: Interfaz hermosa con colores pastel arcoíris
- 📱 **Mobile-First**: Optimizado para uso en celular
- 🔒 **Privado**: Tus datos se guardan localmente

## 🎨 Diseño

### Paleta de Colores Pastel

```
🌸 Rosa Pastel:     #FFD4E5
💙 Celeste Pastel:  #C4E5FF
💜 Morado Pastel:   #E8D4FF
💚 Verde Pastel:    #D4FFE5
🧡 Melocotón:       #FFE5D4
💛 Amarillo Pastel: #FFF4D4
```

### Inspiración Visual

- Iconos animados estilo **Duolingo**
- Microanimaciones suaves con **Framer Motion**
- Bordes redondeados y sombras sutiles
- Espaciado generoso para facilitar interacción táctil

## 🛠️ Stack Técnico

### Frontend
- **React 18** con TypeScript
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Recharts** - Gráficos del dashboard
- **Zustand** - State management ligero
- **React Router** - Navegación
- **Lucide React** - Íconos

### Arquitectura
- **Progressive Web App (PWA)** ready
- **Mobile-first** responsive design
- **LocalStorage** para persistencia (MVP)
- **TypeScript** para type safety

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/daylo-app.git

# Navegar al directorio
cd daylo-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo en http://localhost:3000
npm run build    # Construye la app para producción
npm run preview  # Vista previa de la build de producción
npm run lint     # Ejecuta ESLint
```

## 📱 Flujo de Usuario

### Registro Diario (2-3 min)

1. **Seleccionar Actividades**: Tap en los iconos de las actividades realizadas
2. **Ajustar Tiempos**: Usa los sliders para indicar duración
3. **Reflexionar**: 
   - Selecciona tu mood del día (emoji)
   - Escribe 1-2 líneas sobre lo que rescatas
4. **Guardar**: ¡Listo! Tu día está registrado

### Dashboard Semanal (5 min)

1. Ver gráfico de barras de actividad diaria
2. Analizar distribución de tiempo (pie chart)
3. Revisar estadísticas clave
4. Leer insights personalizados

## 🗂️ Estructura del Proyecto

```
daylo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── icons/          # Iconos animados
│   │   ├── cards/          # Cards de actividades
│   │   ├── sliders/        # Time sliders
│   │   ├── Layout.tsx      # Layout principal
│   │   └── Navigation.tsx  # Navegación inferior
│   ├── pages/
│   │   ├── Home.tsx        # Vista principal (registro diario)
│   │   └── Dashboard.tsx   # Resumen semanal
│   ├── store/
│   │   └── dayloStore.ts   # Zustand store
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── utils/
│   │   └── constants.ts    # Constantes y helpers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 Roadmap

### Fase 1: MVP ✅ (Completado)
- [x] Setup inicial con Vite + React + TypeScript
- [x] Componentes de iconos animados
- [x] Sistema de selección de actividades
- [x] Sliders de tiempo
- [x] Reflexiones y mood selector
- [x] Dashboard con gráficos
- [x] LocalStorage para persistencia

### Fase 2: Backend (Próximo)
- [ ] API con Node.js + Express
- [ ] MongoDB para almacenamiento
- [ ] Autenticación JWT
- [ ] Sincronización multi-dispositivo

### Fase 3: PWA
- [ ] Service Worker
- [ ] Offline support
- [ ] Install prompt
- [ ] Push notifications

### Fase 4: Features Avanzados
- [ ] Estadísticas mensuales/anuales
- [ ] Exportar datos (PDF, CSV)
- [ ] Temas visuales adicionales
- [ ] Iconos personalizables
- [ ] Recordatorios diarios

### Fase 5: IA & Comunidad
- [ ] Insights con IA
- [ ] Recomendaciones personalizadas
- [ ] Comunidad anónima
- [ ] Comparar patrones (opcional)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar Daylo:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 🌟 Agradecimientos

- Inspiración de diseño: Duolingo
- Iconos: Lucide React
- Animaciones: Framer Motion
- Gráficos: Recharts

## 📧 Contacto

¿Preguntas o sugerencias? Abre un issue o contáctanos.

---

**Hecho con 💜 y código limpio**

*Daylo - Ilumina tu día, descubre tu vida* ✨
