# Todo app using different noSQL databases

A minimal todo application demonstrating integrations with different NoSQL databases. Currently supports Redis.

**Status:** Early-stage and under active development — not production-ready. Use at your own risk; features and APIs will change frequently.

## Project Structure

```
.
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # React components (Menu, TodoList, TodoCard)
│   │   ├── services/     # API service calls
│   │   ├── lib/          # Utilities and styling
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # React entry point
│   ├── package.json
│   ├── vite.config.ts    # Vite configuration
│   └── tsconfig.json     # TypeScript configuration
│
└── server/               # Express + Node.js backend
    ├── index.ts          # Server entry point
    ├── routes/
    │   └── api.ts        # API routes
    ├── controllers/
    │   └── cardController.ts  # Todo logic
    ├── package.json
    ├── .env              # Environment variables (Redis credentials)
    └── tsconfig.json     # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Redis instance (or configure connection in `server/.env`)

### Setup & Run

**1. Install dependencies**

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

**2. Configure Redis connection**

Edit `server/.env`:
```
REDIS_PASSWORD=your_redis_password
```

**3. Start the development servers**

```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend dev server
cd client
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## Scripts

**Client:**
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint

**Server:**
- `npm run dev` – Start with nodemon (auto-reload)
- `npm run start` – Start production server
