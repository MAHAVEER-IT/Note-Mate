# 📝 Note-Mate - AI-Powered Note-Taking & Study Planning Application

<div align="center">

![Note-Mate](public/notemate.png)

**An intelligent, all-in-one note-taking companion with AI-powered study planning and productivity tools**

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple?logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green?logo=nodedotjs)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

[Live Demo](#) • [Features](#features) • [Installation](#installation--setup) • [Documentation](#documentation)

</div>

---

## 🎯 Overview

**Note-Mate** is a comprehensive full-stack web application designed to help students and professionals organize their thoughts, manage tasks, and create AI-generated study plans. Built with modern technologies like React, Node.js, and NVIDIA's AI API, Note-Mate provides an intuitive and powerful platform for personal productivity management.

Whether you're a student planning your study schedule, a professional managing projects, or someone who loves organizing ideas, Note-Mate has everything you need to stay productive and organized.

---

## ✨ Features

### 📝 **Smart Note Management**
- ✅ **Create, Edit & Delete Notes** - Full CRUD operations for your notes
- ✅ **Rich Text Support** - Format your notes with ease
- ✅ **Color-Coded Organization** - Categorize notes with visual color schemes
- ✅ **Archive Functionality** - Archive completed notes to keep workspace clean
- ✅ **Note Search** - Quickly find notes with search functionality
- ✅ **Reminders** - Set reminders for important notes
- ✅ **Persistent Storage** - All notes automatically saved to database

### 📌 **Sticky Notes Widget**
- ✅ **Draggable Interface** - Drag and drop sticky notes anywhere on screen
- ✅ **Customizable Colors** - Choose from multiple color schemes
- ✅ **Quick Creation** - Add sticky notes instantly for quick thoughts
- ✅ **Persistent Positioning** - Notes maintain their position across sessions
- ✅ **Easy Deletion** - Remove sticky notes with one click
- ✅ **Always-On-Top** - Sticky notes stay visible for quick reference

### 🤖 **AI-Powered Study Planner**
- ✅ **Smart Schedule Generation** - AI generates personalized study plans using NVIDIA API
- ✅ **Natural Language Input** - Describe what you want to study in plain English
- ✅ **Time-Based Planning** - Get hourly study schedules (7 AM - 9:30 PM)
- ✅ **Activity Suggestions** - AI recommends study activities and break times
- ✅ **Schedule Modification** - Edit and customize AI-generated plans
- ✅ **History Tracking** - View all previously generated study schedules
- ✅ **Save & Load Plans** - Save plans for future reference
- ✅ **Multiple Topics** - Generate plans for different subjects and topics

### 🌓 **Theme & Appearance**
- ✅ **Light & Dark Mode** - Switch between light and dark themes
- ✅ **Modern UI Design** - Clean, intuitive, and responsive interface
- ✅ **Smooth Animations** - Fluid transitions and micro-interactions
- ✅ **Gradient Backgrounds** - Beautiful gradient designs throughout
- ✅ **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- ✅ **Design System** - Consistent colors, spacing, and typography

### 🔔 **Notifications & Reminders**
- ✅ **In-App Notifications** - Real-time notification system
- ✅ **Reminder Alerts** - Get notified about important notes and tasks
- ✅ **Toast Messages** - Temporary notifications for user actions
- ✅ **Status Messages** - Visual feedback for all operations

### 🔐 **User Authentication & Security**
- ✅ **Secure Registration** - Create an account with email and password
- ✅ **Secure Login** - Access your account safely
- ✅ **Password Hashing** - Passwords encrypted with bcrypt
- ✅ **JWT Tokens** - Secure session management
- ✅ **Protected Routes** - Only authenticated users can access app
- ✅ **Profile Management** - Manage your account settings

### 🎨 **Modern Landing Page**
- ✅ **Hero Section** - Engaging hero with app preview image
- ✅ **Feature Showcase** - Display all key features with images
- ✅ **Call-to-Action** - Direct users to signup or login
- ✅ **Responsive Design** - Perfect display on all devices
- ✅ **Animated Elements** - Smooth animations and transitions
- ✅ **Modern Design** - Beautiful gradient and color scheme

### ⚙️ **Settings & Customization**
- ✅ **Theme Preferences** - Save theme choice
- ✅ **Account Settings** - Manage personal information
- ✅ **Privacy Controls** - Control data visibility
- ✅ **Notification Preferences** - Customize notification settings

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.2 |
| **Vite** | Build Tool & Dev Server | 6.3 |
| **React Router DOM** | Client-side Routing | 6.22 |
| **Context API** | State Management | Built-in |
| **Axios** | HTTP Client | 1.9 |
| **React-Draggable** | Drag & Drop | 4.4 |
| **Lucide React** | Icon Library | 0.503 |
| **CSS3** | Styling | Latest |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript Runtime |
| **Express** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **bcrypt** | Password Hashing |
| **CORS** | Cross-Origin Requests |
| **dotenv** | Environment Variables |

### **AI & External APIs**
| Service | Purpose |
|---------|---------|
| **NVIDIA AI API** | Study Plan Generation |
| **Vite Proxy** | API Route Forwarding |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **ESLint** | Code Linting |
| **Autoprefixer** | CSS Vendor Prefixes |
| **Tailwind CSS** | Utility CSS (Optional) |

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (for backend)
- Git

### **Step 1: Clone Repository**
```bash
git clone https://github.com/MAHAVEER-IT/Note-Mate.git
cd Note-Mate
```

### **Step 2: Frontend Setup**
```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_NVIDIA_API_KEY=your_nvidia_api_key_here" > .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### **Step 3: Backend Setup (if applicable)**
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/note-mate" > .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "PORT=5000" >> .env

# Start backend server
npm start
```

### **Step 4: Verification**
- ✅ Frontend running at http://localhost:5173
- ✅ Backend running at http://localhost:5000
- ✅ Both services connected and working

---

## 📂 Project Structure

```
Note-Mate/
├── public/                          # Static assets
│   ├── notemate.png                # Logo
│   └── images/                     # Image files
│
├── src/                            # Source code
│   ├── assets/
│   │   └── images/                # Application images
│   │       ├── Notes.png          # Hero image
│   │       ├── img1.png           # Feature 1
│   │       ├── img2.png           # Feature 2
│   │       └── img3.png           # Feature 3
│   │
│   ├── components/                # React components
│   │   ├── AI/
│   │   │   ├── AIPage.jsx         # AI Study Planner
│   │   │   ├── AIPage.css         # AI Styling
│   │   │   └── AIHistoryDetails.jsx # Schedule History
│   │   │
│   │   ├── NavBar/
│   │   │   ├── NavBar.jsx         # Navigation Bar
│   │   │   └── NavBar.css         # NavBar Styling
│   │   │
│   │   ├── Notes/
│   │   │   ├── NoteList.jsx       # Notes List Component
│   │   │   ├── NoteCard.jsx       # Individual Note Card
│   │   │   ├── AddNoteModal.jsx   # Add Note Modal
│   │   │   └── Notes.css          # Notes Styling
│   │   │
│   │   ├── StickyNote/
│   │   │   ├── StickyNoteList.jsx # Sticky Notes Container
│   │   │   ├── StickyNoteCard.jsx # Draggable Note Card
│   │   │   ├── AddStickyNoteModal.jsx # Create Sticky Note
│   │   │   └── StickyNote.css     # Styling
│   │   │
│   │   ├── Modals/
│   │   │   ├── RemindersModal.jsx # Reminders Modal
│   │   │   └── RemindersModal.css # Modal Styling
│   │   │
│   │   ├── Notifications/
│   │   │   ├── NotificationsBar.jsx # Notification Display
│   │   │   └── NotificationsBar.css # Styling
│   │   │
│   │   └── Settings/
│   │       ├── SettingsPage.jsx   # Settings Page
│   │       └── Settings.css       # Settings Styling
│   │
│   ├── context/                   # React Context & State Management
│   │   ├── AIContext.jsx          # AI State Management
│   │   ├── AuthContext.jsx        # Authentication Context
│   │   ├── NotesContext.jsx       # Notes State
│   │   ├── NotificationsContext.jsx # Notifications State
│   │   ├── StickyNotesContext.jsx # Sticky Notes State
│   │   └── ThemeContext.jsx       # Theme State
│   │
│   ├── pages/                     # Page Components
│   │   ├── Login.jsx              # Login Page
│   │   ├── Register.jsx           # Registration Page
│   │   ├── LandingPage/
│   │   │   ├── LandingPage.jsx    # Landing Page
│   │   │   ├── LandingPage.css    # Landing Styling
│   │   │   └── LandingPagePreview.jsx
│   │   └── Home/
│   │       ├── HomePage.jsx       # Main App Page
│   │       └── HomePage.css       # Home Styling
│   │
│   ├── services/                  # API Services
│   │   ├── authService.js         # Authentication API
│   │   ├── notesService.js        # Notes API
│   │   ├── StickyNoteService.js   # Sticky Notes API
│   │   ├── nvidiaService.js       # NVIDIA AI API
│   │   ├── geminiService.js       # Gemini API (Legacy)
│   │   └── aiScheduleService.js   # Schedule Management API
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx          # Route Configuration
│   │
│   ├── Styles/
│   │   ├── Login.css              # Auth Page Styling
│   │   └── Register.css           # Register Page Styling
│   │
│   ├── App.jsx                    # Main App Component
│   ├── App.css                    # Global Styles & Design System
│   ├── index.css                  # Base Styles
│   └── main.jsx                   # Entry Point
│
├── .env                           # Environment Variables
├── .gitignore                     # Git Ignore File
├── eslint.config.js               # ESLint Configuration
├── vite.config.js                 # Vite Configuration
├── vercel.json                    # Vercel Deployment
├── package.json                   # Dependencies
└── README.md                      # Documentation

```

---

## 🚀 Getting Started

### **Quick Start Guide**

#### **1. Create Your First Note**
```
1. Login or Register
2. Navigate to "Notes" section
3. Click "Add Note" button
4. Enter title and content
5. Choose color category
6. Click "Save Note"
```

#### **2. Add a Sticky Note**
```
1. Click "Sticky Notes" on navbar
2. Click "Create Sticky Note"
3. Enter your quick thought
4. Choose a color
5. Click "Add" to place it on screen
6. Drag it anywhere on your workspace
```

#### **3. Generate AI Study Plan**
```
1. Go to "AI Planner" section
2. Enter what you want to study (e.g., "Mathematics for 4 hours")
3. Click "Generate" button
4. Wait for AI to create schedule
5. Review the generated study plan
6. Edit if needed, or save for later
```

#### **4. Set Reminders**
```
1. In Notes, click the reminder icon on any note
2. Set date and time
3. Click "Set Reminder"
4. Get notified at the scheduled time
```

---

## 📱 Features in Detail

### **Note Management System**
The core feature of Note-Mate. Create, organize, and manage all your notes efficiently.

**Capabilities:**
- Unlimited note creation
- Color categorization (5+ colors)
- Quick edit/delete functionality
- Archive completed notes
- Search and filter
- Bulk operations

**Example:**
```
Title: "JavaScript Fundamentals"
Content: "Variables, Functions, Closures..."
Color: Blue
Reminder: Tomorrow at 9 AM
Status: Active
```

### **Sticky Notes Widget**
Floating notes for quick reminders and ideas.

**Capabilities:**
- Drag anywhere on screen
- Resize notes
- Multiple colors
- Transparent backgrounds
- Click anywhere to create
- Persistent storage

### **AI Study Planner**
Intelligent schedule generation powered by NVIDIA's API.

**How it works:**
1. User enters study topic and duration
2. Request sent to NVIDIA API
3. AI generates hourly schedule
4. Includes break times and activities
5. User can edit and save

**Example Output:**
```
7:00 AM - 8:00 AM: JavaScript Basics
8:00 AM - 9:00 AM: Functions & Scope
9:00 AM - 9:15 AM: Break
9:15 AM - 10:30 AM: Advanced Concepts
```

### **Theme System**
Switch between light and dark themes instantly.

**CSS Variables Used:**
```css
--primary-50 to --primary-900  /* Blue shades */
--neutral-50 to --neutral-900  /* Gray shades */
--spacing-xs to --spacing-3xl   /* Spacing scale */
--radius-xs to --radius-2xl     /* Border radius */
--shadow-xs to --shadow-xl      /* Shadows */
--transition-fast/base/slow     /* Animations */
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# NVIDIA API Configuration
VITE_NVIDIA_API_KEY=your_nvidia_api_key_here

# Backend URL (if needed)
VITE_API_BASE_URL=http://localhost:5000/api

# Gemini API (Legacy, optional)
VITE_GEMINI_API_KEY=your_gemini_key_here

# App Configuration
VITE_APP_NAME=Note-Mate
VITE_APP_VERSION=1.0.0
```

**Getting API Keys:**
1. **NVIDIA API**: Visit [NVIDIA API Portal](https://build.nvidia.com)
2. **Gemini API**: Visit [Google AI Studio](https://aistudio.google.com)

---

## 🔄 API Integration

### **NVIDIA Study Plan Generation**
```javascript
// Request
POST /v1/chat/completions
{
  "prompt": "Create a study plan for JavaScript"
}

// Response
{
  "schedule": [
    { "time": "7:00 AM", "activity": "JavaScript Basics" },
    { "time": "8:00 AM", "activity": "Functions & Closures" },
    ...
  ]
}
```

### **Backend API Endpoints**

#### **Authentication**
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/user              # Get current user
POST   /api/auth/logout            # Logout user
```

#### **Notes**
```
GET    /api/notes                  # Get all notes
POST   /api/notes                  # Create note
GET    /api/notes/:id              # Get specific note
PUT    /api/notes/:id              # Update note
DELETE /api/notes/:id              # Delete note
POST   /api/notes/:id/archive      # Archive note
```

#### **Sticky Notes**
```
GET    /api/sticky-notes           # Get all sticky notes
POST   /api/sticky-notes           # Create sticky note
PUT    /api/sticky-notes/:id       # Update sticky note
DELETE /api/sticky-notes/:id       # Delete sticky note
```

#### **AI Schedules**
```
GET    /api/ai-schedules           # Get all schedules
POST   /api/ai-schedules           # Save new schedule
GET    /api/ai-schedules/:id       # Get schedule details
PUT    /api/ai-schedules/:id       # Update schedule
DELETE /api/ai-schedules/:id       # Delete schedule
POST   /api/ai-schedules/:id/share # Share schedule
```

---

## 🎨 Customization & Theming

### **Adding Custom Colors**

Edit `src/App.css`:
```css
:root {
  --primary-500: #4f46e5;      /* Change primary color */
  --secondary-500: #06b6d4;    /* Add secondary color */
  --success-500: #10b981;      /* Add success color */
  --warning-500: #f59e0b;      /* Add warning color */
  --error-500: #ef4444;        /* Add error color */
}
```

### **Modifying Animations**

Example animation adjustment in CSS:
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply with custom duration */
.element {
  animation: slideInLeft 0.5s ease-out;
}
```

---

## 📊 Usage Statistics

### **Page Views**
- Landing Page: Public access
- Login/Register: Authentication pages
- Home: Protected main app page
- AI Planner: Requires login
- Settings: User preferences

### **Data Storage**
- **Notes**: MongoDB collection
- **Sticky Notes**: Local storage + DB
- **Study Plans**: MongoDB collection
- **User Data**: Encrypted in MongoDB

---

## 🚢 Deployment

### **Deploy on Vercel (Frontend)**
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy Note-Mate"
git push origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Import GitHub repository
# - Set environment variables
# - Deploy

# 3. Verify
# App will be live at: https://note-mate.vercel.app
```

### **Deploy Backend (Heroku/Railway)**
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- Input validation
- Error handling

⚠️ **Additional Recommendations:**
- Use HTTPS only
- Enable rate limiting
- Add request validation middleware
- Regular security audits
- Update dependencies regularly

---

## 🐛 Troubleshooting

### **Problem: "NVIDIA API Key not found"**
**Solution:**
```
1. Check .env file exists
2. Verify VITE_NVIDIA_API_KEY is set
3. Restart dev server: npm run dev
```

### **Problem: "Notes not saving"**
**Solution:**
```
1. Check MongoDB connection
2. Verify backend is running
3. Check browser console for errors
4. Verify JWT token is valid
```

### **Problem: "Sticky notes not dragging"**
**Solution:**
```
1. Clear browser cache
2. Check React-Draggable is installed
3. Ensure CSS is loaded properly
4. Try different browser
```

### **Problem: "AI Planner timeout"**
**Solution:**
```
1. Check internet connection
2. Verify API key is valid
3. Try shorter prompt
4. Check API rate limits
```

---

## 📚 Documentation Files

Additional documentation available:
- `NOTES_UI_IMPROVEMENTS.md` - UI enhancements documentation
- `STICKY_NOTES_UI_IMPROVEMENTS.md` - Sticky notes improvements
- `vercel.json` - Deployment configuration

---

## 🚀 Performance Optimization

### **Frontend Optimizations**
- ✅ Code splitting with Vite
- ✅ Lazy loading for components
- ✅ Image optimization
- ✅ CSS minification
- ✅ Efficient state management

### **Backend Optimizations**
- ✅ Database indexing
- ✅ Query optimization
- ✅ Caching strategy
- ✅ API rate limiting
- ✅ Connection pooling

---

## 🤝 Contributing

We welcome contributions! Here's how to contribute:

### **Step 1: Fork Repository**
```bash
git clone https://github.com/your-username/Note-Mate.git
cd Note-Mate
```

### **Step 2: Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

### **Step 3: Make Changes**
```bash
# Edit files and add features
git add .
git commit -m "Add: Your feature description"
```

### **Step 4: Push & Create PR**
```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

### **Contribution Guidelines**
- Follow code style conventions
- Write descriptive commit messages
- Update documentation
- Test thoroughly before submitting
- Be respectful and constructive

---

## 📈 Future Enhancements

### **Planned Features**
- 📱 Mobile app (React Native)
- 🌐 Collaborative note sharing
- 📤 Export to PDF/Word
- 🔄 Real-time sync
- 🎙️ Voice notes
- 📸 Image attachment
- 🏷️ Advanced tagging system
- 📊 Analytics dashboard
- 🔔 Smart notifications
- 🤖 More AI features

### **Performance Improvements**
- Service worker for offline mode
- Database query optimization
- Caching strategies
- Progressive Web App (PWA)

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

```
MIT License

Copyright (c) 2024 MAHAVEER-IT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

---

## 👨‍💻 Authors & Contributors

### **Created by**
- **[MAHAVEER-IT](https://github.com/MAHAVEER-IT)** - Lead Developer

### **Contributors**
- Your name here! [Submit PR](#contributing)

---

## 📞 Support & Community

### **Get Help**
- 📧 Email: support@notemate.app
- 💬 Discord: [Join Server](#)
- 🐛 Issue Tracker: [GitHub Issues](#)
- 📖 Documentation: [Wiki](#)

### **Stay Updated**
- ⭐ Star the repository
- 🔔 Watch for releases
- 📰 Subscribe to newsletter
- 🐦 Follow on Twitter: [@NoteMateApp](#)

---

## 🎓 Learning Resources

### **React & Frontend**
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

### **Backend & Databases**
- [Node.js Documentation](https://nodejs.org/docs)
- [Express Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)

### **AI & APIs**
- [NVIDIA AI Documentation](https://build.nvidia.com/docs)
- [Google AI Studio](https://aistudio.google.com)

---

## 💡 Tips & Tricks

### **Pro Tips for Users**
1. Use color categories to organize notes by topic
2. Create study plans weekly for better planning
3. Use sticky notes for daily tasks
4. Set reminders for important deadlines
5. Archive old notes to keep workspace clean

### **Developer Tips**
1. Use React DevTools extension for debugging
2. Check Network tab for API calls
3. Use console for error tracking
4. Test on multiple browsers
5. Keep dependencies updated

---

## 📊 Statistics

- **📝 Version**: 1.0.0
- **📅 Last Updated**: May 1, 2026
- **👥 Contributors**: 1+
- **⭐ Stars**: [Your count here]
- **🍴 Forks**: [Your count here]
- **📄 Lines of Code**: 5000+
- **📦 Dependencies**: 10+

---

## 🙏 Acknowledgments

Special thanks to:
- ✨ NVIDIA for AI API
- 🚀 Vite and React teams
- 💚 Open source community
- 👨‍👩‍👧‍👦 All contributors and users

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star!

**Made with ❤️ by [MAHAVEER-IT](https://github.com/MAHAVEER-IT)**

[⬆ Back to top](#-note-mate---ai-powered-note-taking--study-planning-application)

</div>
