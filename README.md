# Intern Portal

The **Intern Portal** is a web application designed to engage interns by allowing them to track their progress, compete on a leaderboard, and earn rewards. Built with a **Node.js/Express** backend and a **React** frontend, it features a responsive, modern interface with animated components and a stable backend using dummy data to bypass MongoDB connection issues. This README provides detailed instructions for setting up, running, testing, and troubleshooting the application.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Fix npm Vulnerabilities](#fix-npm-vulnerabilities)
- [Running the Application](#running-the-application)
  - [Start the Backend](#start-the-backend)
  - [Start the Frontend](#start-the-frontend)
- [Testing](#testing)
  - [Backend Endpoints](#backend-endpoints)
  - [Frontend Pages](#frontend-pages)
  - [Navbar Functionality](#navbar-functionality)
  - [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)
  - [Backend Issues](#backend-issues)
  - [Frontend Issues](#frontend-issues)
  - [Responsive Issues](#responsive-issues)
  - [npm Vulnerabilities](#npm-vulnerabilities)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Homepage** (`/`):
  - Parallax hero section with animated gradient background.
  - Feature cards with Font Awesome icons and hover animations.
  - Leaderboard preview with animated progress bars (top 3 users).
  - Testimonial slider with navigation buttons and auto-rotation.
  - Navbar hidden for a clean landing experience.
- **Login Page** (`/login`):
  - Responsive form with animated inputs, password toggle (show/hide), and error feedback with shake animation.
  - Dummy Google and Facebook login buttons (circular, disabled with tooltips).
  - Loading spinner during form submission.
  - Navbar hidden.
- **Dashboard** (`/dashboard`):
  - Displays user data (name, referral code, donations) in a stats card with hover effects.
  - Animated donation progress bar and referral code copy button with feedback.
  - Mock recent activity feed for engagement.
  - Top-right navbar with toggle and outside-click closing.
- **Leaderboard** (`/leaderboard`):
  - Displays top users with donation points.
  - Top-right navbar with toggle and outside-click closing.
- **Signup Page** (`/signup`):
  - Form for new user registration (navbar hidden).
- **Backend**:
  - Uses dummy data to avoid MongoDB timeouts for `/api/users/login`, `/api/users/me`, and `/api/leaderboard`.
  - Instant API responses for testing purposes.

## Technologies
- **Frontend**:
  - React 18.2.0
  - React Router DOM 6.14.2
  - Axios 1.7.2
  - Font Awesome 6.4.0 (for icons)
  - CSS with responsive design (Flexbox, media queries, `clamp`, `%`, `vw`, `rem`)
- **Backend**:
  - Node.js
  - Express
  - Dummy data (no MongoDB dependency in current setup)
- **Development**:
  - react-scripts 5.0.1
  - npm 8 or higher

## Prerequisites
- **Node.js**: Version 16 or higher. Install from [nodejs.org](https://nodejs.org/).
- **npm**: Version 8 or higher (included with Node.js).
- **Git**: For cloning the repository. Install from [git-scm.com](https://git-scm.com/).
- **Browser**: Chrome, Firefox, or Edge for testing the frontend.
- **Command Line**: Terminal (e.g., Bash, PowerShell, or Command Prompt).
- **Text Editor**: VS Code or any editor for modifying files.

## Installation

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify the backend uses dummy data in:
   - `server/controllers/userController.js`
   - `server/controllers/leaderboardController.js`
   - These files return mock data to avoid MongoDB connection issues. If you want to use MongoDB, set a valid `MONGO_URI` in `server/.env` (see [Troubleshooting](#backend-issues)).

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify `public/index.html` includes Font Awesome for icons:
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
   ```

### Fix npm Vulnerabilities
The frontend has 9 known vulnerabilities (3 moderate, 6 high). Fix them:
```bash
cd client
npm audit fix
```
If vulnerabilities persist:
```bash
npm install --save-dev eslint@8.57.0 @babel/core@latest @babel/preset-env@latest
```
Check the audit report:
```bash
npm audit
```

## Running the Application

### Start the Backend
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the server:
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:5000`.
   - Uses dummy data for `/api/users/login`, `/api/users/me`, and `/api/leaderboard`.
   - Logs are written to `server/server.log` (if configured).

### Start the Frontend
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Start the frontend:
   ```bash
   npm start
   ```
   - Runs on `http://localhost:3000`.
   - Automatically opens in your default browser.
   - Hot-reloading is enabled for development.

## Testing

### Backend Endpoints
Test the backend APIs to ensure they respond instantly with dummy data:
```bash
cd server
curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
curl http://localhost:5000/api/users/me
curl http://localhost:5000/api/leaderboard
```


### Frontend Pages
Test each page on `http://localhost:3000` using different screen sizes (desktop, tablet, mobile) via browser dev tools:
1. **Home** (`/`):
   - Parallax hero with animated gradient.
   - Feature cards with icons and hover effects.
   - Leaderboard preview with progress bars (top 3).
   - Testimonial slider with navigation buttons.
   - Navbar hidden.
2. **Login** (`/login`):
   - Responsive form with animated inputs, password toggle, and error feedback (shake animation).
   - Dummy Google/Facebook buttons (disabled, circular with logos).
   - Test with `john@example.com`, `password123`.
   - Navbar hidden.
3. **Dashboard** (`/dashboard`):
   - Top-right navbar with toggle and outside-click closing.
   - Stats card with user data, copy button for referral code, and donation progress bar.
   - Mock recent activity feed.
4. **Leaderboard** (`/leaderboard`):
   - Top-right navbar with toggle and outside-click closing.
   - List of top users with donation points.
5. **Signup** (`/signup`):
   - Registration form.
   - Navbar hidden.

### Navbar Functionality
- On `/dashboard` or `/leaderboard`:
  - Click "☰ Menu" to toggle the navbar.
  - Click outside the navbar (e.g., page content) to close it.
  - Test links to `/dashboard`, `/leaderboard`, and "Log Out" (redirects to `/`).

### Responsive Design
- Use browser dev tools to simulate screen sizes (e.g., 320px, 768px, 1024px).
- Verify:
  - **Login Page**: Form inputs, buttons, and social login buttons scale fluidly (using `clamp`, `%`, `vw`, `rem`).
  - **Home Page**: Hero, feature cards, and testimonial slider adjust to screen width.
  - **Dashboard**: Stats card and activity feed stack on smaller screens.
  - **Navbar**: Menu items stack vertically on mobile.
  

## Project Structure
intern-portal/
├── client/
│   ├── public/
│   │   └── index.html           # Entry HTML with Font Awesome
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js        # Navbar with outside-click closing
│   │   ├── pages/
│   │   │   ├── Home.js          # Homepage with parallax and animations
│   │   │   ├── DashboardPage.js  # Dashboard with stats and activity
│   │   │   ├── LoginPage.js     # Login with responsive form and social buttons
│   │   │   ├── Leaderboard.js   # Leaderboard page
│   │   │   └── Signup.js        # Signup page
│   │   ├── styles/
│   │   │   ├── Home.css         # Homepage styles
│   │   │   ├── Dashboard.css    # Dashboard styles
│   │   │   ├── Login.css        # Login page styles
│   │   │   ├── Navbar.css       # Navbar styles
│   │   │   └── index.css        # Global styles
│   │   ├── api.js               # API calls (axios)
│   │   └── index.js             # React entry point
│   └── package.json             # Frontend dependencies
├── server/
│   ├── controllers/
│   │   ├── userController.js    # User API with dummy data
│   │   └── leaderboardController.js # Leaderboard API with dummy data
│   ├── routes/
│   │   ├── users.js             # User routes
│   │   └── leaderboard.js       # Leaderboard routes
│   ├── server.js                # Express server
│   └── package.json             # Backend dependencies
└── README.md                    # This file

## Future Improvements
- Implement functional Google and Facebook login using OAuth.
- Add MongoDB integration with proper error handling.
- Enhance the signup page with animations and social login buttons.
- Add user profile editing on the dashboard.
- Implement real-time leaderboard updates using WebSockets.
- Fix remaining npm vulnerabilities with dependency upgrades.