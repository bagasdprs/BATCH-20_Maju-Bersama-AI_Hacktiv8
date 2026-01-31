# 🦊 Hacktiv8 AI Chatbot

A Fullstack AI Chatbot application built for **Hacktiv8 Session 5 Project**.
This application integrates **Google Gemini AI** with a robust backend architecture and a modern, responsive frontend interface.

## 🚀 Tech Stack

### Backend (Server)

- **Runtime:** Node.js & Express
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **AI Model:** Google Gemini (via Google Generative AI SDK)
- **Architecture:** MVC + Repository & Service Pattern

### Frontend (Client)

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Features:** React Markdown, Syntax Highlighting, Lucide Icons

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone `https://github.com/bagasdprs/BATCH-20_Maju-Bersama-AI_Hacktiv8.git`
cd project-chatbot
```

### 2. Setup Backend (Server)

Open a terminal and navigate to the server folder:

```bash
cd server
npm install
```

Create a _.env_ file in the `server/` directory:

```bash
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/nama_database
GEMINI_API_KEY=your_api_key_here
```

Run Database Migration (Drizzle):

```bash
npm run db:push  # or equivalent migration command
```

Start the Server:

```bash
npm run dev
```

_Server will run on: `http://localhost:3000`_

### 3. Setup Frontend (Client)

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
```

Start the Client:

```bash
npm run dev
```

_Client will run on: `http://localhost:5173`_

## ✨ Features

- **Smart AI Conversations:** Context-aware responses using Gemini AI.
- **Code Syntax Highlighting:** Beautifully formatted code blocks for developers.
- **Markdown Support:** Renders bold, lists, and formatted text.
- **Responsive Design:** Mobile-friendly sidebar (Off-canvas menu).
- **Modern UI:** Glassmorphism & "Hacktiv8 Orange" Dark Theme.
- **Chat History:** Stores conversation history in PostgreSQL.

## 👨‍💻 Author

Developed by Bagas Dwiprasandi Hacktiv8 Fullstack JavaScript Immersive
