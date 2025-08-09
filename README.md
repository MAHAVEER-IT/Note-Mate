# Note-Mate

Note-Mate is a comprehensive note-taking and productivity application that helps users organize their thoughts, manage tasks, and create AI-generated study plans. Built with React and Node.js, it offers a full-stack solution for personal productivity management.

<img src="public/notemate.png" alt="Note Mate Logo" width="100" height="100"/>

## Features

### 📝 Note Management
- Create, edit, and delete notes
- Color-coded notes for visual organization
- Archive functionality for completed notes
- Set reminders for important notes

### 📌 Sticky Notes
- Create draggable sticky notes for quick reminders
- Customize colors
- Position anywhere on your workspace
- Persist across sessions

### 🤖 AI Study Planner
- Generate personalized study schedules using AI
- Voice input support for creating study plans
- Save and view schedule history
- Modify generated schedules to fit your needs

### 🌓 Theme Support
- Light and dark mode
- Personalized UI experience

### 🔔 Notifications
- Reminder notifications
- System alerts and messages

### 🔐 User Authentication
- Secure login and registration
- Protected routes for authenticated users

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Context API**: For state management
- **Axios**: For HTTP requests
- **React-Draggable**: For sticky note functionality
- **Lucide-React**: For icons
- **CSS**: For styling components

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication
- **bcrypt**: For password hashing
- **Cors**: For cross-origin resource sharing
- **dotenv**: For environment variables

### AI Integration
- **Google Gemini API**: For generating AI study plans

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/MAHAVEER-IT/Note-Mate.git
   cd Note-Mate
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd Backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

## Project Structure

```
Note-Mate/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AI/
│   │   ├── Modals/
│   │   ├── NavBar/
│   │   ├── Notes/
│   │   ├── Notifications/
│   │   ├── Settings/
│   │   └── StickyNote/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── Styles/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Notes
- `GET /api/notes` - Get all notes for a user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PUT /api/notes/:id/archive` - Archive/unarchive a note

### Sticky Notes
- `GET /api/sticky-notes` - Get all sticky notes
- `POST /api/sticky-notes` - Create a new sticky note
- `PUT /api/sticky-notes/:id` - Update a sticky note
- `DELETE /api/sticky-notes/:id` - Delete a sticky note

### AI Schedules
- `GET /api/ai-schedules` - Get all schedules
- `POST /api/ai-schedules` - Save a new schedule
- `GET /api/ai-schedules/:id` - Get a specific schedule
- `PUT /api/ai-schedules/:id` - Update a schedule

## Future Enhancements
- Mobile application support
- Collaborative note sharing
- Export functionality for notes and schedules
- More AI-powered features
- Calendar integration
- Task tracking and analytics

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.


## Author
[MAHAVEER-IT](https://github.com/MAHAVEER-IT)
