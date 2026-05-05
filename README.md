# Note-Mate Frontend

A comprehensive note-taking and productivity web application built with React and Vite. Features include notes management, draggable sticky notes, AI-powered study planning, and dark/light theme support.

## Features

- 📝 **Note Management** - Create, edit, delete, and archive notes with color coding
- 📌 **Sticky Notes** - Draggable notes that persist across sessions
- 🤖 **AI Study Planner** - Generate personalized study schedules using NVIDIA API (via backend)
- 🌓 **Theme Support** - Light and dark mode
- 🔔 **Reminders** - Set reminders for important notes
- 🔐 **Authentication** - Secure login/register with JWT tokens
- 📱 **Responsive** - Mobile-friendly UI

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Router v6** - Navigation
- **Context API** - State management
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **React Draggable** - Sticky note positioning

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend server running (see [Note-Mate-Backend](../Note-Mate-Backend-main/README.md))

### Installation

```bash
# Clone or navigate to frontend directory
cd Note-Mate

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend API URL
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AI/             # Study planner UI
│   ├── Notes/          # Note management UI
│   ├── StickyNote/     # Draggable sticky notes
│   ├── NavBar/         # Navigation
│   ├── Settings/       # User preferences
│   └── Modals/         # Modal dialogs
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home/
│   └── LandingPage/
├── context/            # State management
│   ├── AuthContext.jsx
│   ├── NotesContext.jsx
│   ├── AIContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationsContext.jsx
├── services/           # API communication
│   ├── apiClient.js    # Axios instance
│   ├── authService.js
│   ├── notesService.js
│   ├── nvidiaService.js
│   └── StickyNoteService.js
├── routes/             # Route configuration
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
└── App.jsx             # Main component
```

## Context API

### AuthContext
Manages user authentication state and login/logout.

```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### NotesContext
Manages all notes CRUD operations.

```javascript
const { notes, createNote, updateNote, deleteNote, archiveNote } = useNotes();
```

### AIContext
Manages study plan generation and history.

```javascript
const { generateStudyPlan, studyPlan, isLoading, error } = useAI();
```

### ThemeContext
Manages light/dark theme.

```javascript
const { theme, toggleTheme } = useTheme();
```

## API Endpoints

All endpoints are prefixed with `/api`:

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /notes` - Get all user notes
- `POST /notes` - Create note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `PUT /notes/:id/archive` - Archive note
- `GET /sticky-notes` - Get sticky notes
- `POST /sticky-notes` - Create sticky note
- `PUT /sticky-notes/:id` - Update sticky note
- `DELETE /sticky-notes/:id` - Delete sticky note
- `POST /ai/chat/completions` - Generate study plan

## Security

⚠️ **Important**: The NVIDIA API key is handled securely on the backend. The frontend only sends prompts to `/api/ai/chat/completions`, keeping all sensitive credentials server-side.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build & Serve

```bash
# Build production bundle
npm run build

# Serve dist folder with any static server
npx serve dist
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API connection errors
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file has correct `VITE_API_URL`
- Verify CORS is enabled in backend

### Theme not persisting
- Check if localStorage is enabled in browser
- Clear browser cache and reload

### AI study plan not generating
- Ensure backend has `NVIDIA_API_KEY` in `.env`
- Check backend logs for API errors

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For issues and feature requests, please check the [Issues](https://github.com/MAHAVEER-IT/Note-Mate-Frontend/issues) page.
