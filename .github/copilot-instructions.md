# Daylo Project Guidelines

## Code Style

- **TypeScript React**: Functional components with hooks, default exports
- **Naming**: PascalCase components, camelCase functions, SCREAMING_SNAKE_CASE constants
- **Component Structure**: Imports → Props Interface → Component (store hooks, local state, handlers, JSX)
- **Key Pattern**: Selective Zustand subscriptions - `const { value } = useDayloStore()` not entire store
- **Reference**: [DiarySection.tsx](../src/components/DiarySection.tsx), [Home.tsx](../src/pages/Home.tsx)

## Architecture

### State Flow (Critical)
```
Component → Zustand Store → localStorage (fast) → Firebase (sync)
```
- **Store**: [dayloStore.ts](../src/store/dayloStore.ts) - single source with colocated actions
- **Service**: [firebaseService.ts](../src/services/firebaseService.ts) - Firebase CRUD operations
- **Pattern**: Always update store first (optimistic UI), then persist

### Why HashRouter
- GitHub Pages deployment requires hash-based routing
- See [App.tsx](../src/App.tsx) - uses `HashRouter` not `BrowserRouter`

### Component Organization
- `/components` - shared UI elements
- `/components/cards` - ActivityCard, RatingCard, BooleanCard
- `/components/modals` - bottom sheet modals
- `/pages` - route-based views (Home, Dashboard, Profile)

## Build and Test

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # TypeScript check + Vite build
npm run deploy       # Build + deploy to GitHub Pages
npm run lint         # ESLint check
```

## Project Conventions

### Animations (Framer Motion)
- **Standard entry**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- **Modals**: Bottom sheets from `y: '100%'` to `y: 0`
- **Use AnimatePresence**: For conditional rendering with exit animations

### Firebase Patterns
- **Doc IDs**: `{userEmail}_{YYYY-MM-DD}` format
- **Always merge**: Use `{ merge: true }` for updates to avoid data loss
- **Error handling**: Try Firebase, fallback to localStorage on error

### Tailwind + Custom Classes
- Base styles: [index.css](../src/index.css) defines `.daylo-card`, `.daylo-button`, `.daylo-icon-card`
- Theme: [tailwind.config.js](../tailwind.config.js) extends with pastel colors
- **Don't**: Use inline style objects, use Tailwind utilities

### Time Context Pattern
```typescript
// Adapt UI by time of day - see Home.tsx, DiarySection.tsx
function getTimeContext(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 19) return 'afternoon'
  return 'evening'
}
```

## Integration Points

### Firebase Config
- [firebase.ts](../src/config/firebase.ts) - Firestore connection
- Auth: Email-based (stored in localStorage: 'daylo-user-email')
- Collections: `users`, `dailyEntries`

### Constants as Configuration
- [constants.ts](../src/utils/constants.ts) - `ACTIVITY_OPTIONS`, `ACTIVITY_FACETS`, `MOODS`
- Modify constants to add/change activity types, not hardcoded in components

### Types
- [types/index.ts](../src/types/index.ts) - `Activity`, `DailyEntry`, `Task`, `ActivityOption`
- All components import types from this central location

## Security

- Firebase read/write rules should limit access to authenticated users only
- User identification via email (no password auth in MVP)
- Sensitive config in environment variables (not committed)
