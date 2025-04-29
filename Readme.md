# Blog API 

A modern full-stack blogging platform built with React, Hono, and Cloudflare Workers.

## About

Pencraft is a high-performance blogging platform optimized for edge computing using Cloudflare Workers. It provides a seamless experience for creating and sharing medical-related content with TypeScript support throughout the stack.

## Features

- 👤 Secure authentication system
- ✍️ Markdown-based blog editor
- 🚀 Edge-computing powered backend
- 📱 Responsive design
- 🎨 Modern UI with TailwindCSS
- 🔒 TypeScript support
- 📝 Rich Markdown editor integration
- ⚡ Fast page loads with Vite

## Technologies Used

### Backend
- Cloudflare Workers
- Hono (Backend Framework)
- Prisma with Accelerate
- JWT Authentication
- bcryptjs for password hashing

### Frontend `(Not fully implemented)`
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- React MD Editor
- Axios for API calls
- Lucide React for icons


## Local Setup

### Backend Setup

1. Navigate to the backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Setup DB (`PostgreSQL` + `Prisma Accelerate`)
- Get your connection url from neon.db or aieven.tech
```bash 
postgres://neondb:password@host/db
```
- Get connection pool URL from [Prisma accelerate](https://www.prisma.io/data-platform/accelerate)
```bash 
prisma://accelerate.prisma-data.net/?api_key=...
```
- Replace `DATABASE_URL` in `.env` with your neon DB connection URL
```bash
DATABASE_URL="postgres://avnadmin:password@host/db"
```
- Add `DATABASE_URL` as the connection pool url in `wrangler.toml`
```bash
name = "backend"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=..."
```


4. Start the development server
```bash
npm run dev
```
### Frontend Setup

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`


## Development Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with Wrangler
- `npm run deploy` - Deploy to Cloudflare Workers

## Environment Setup

### Backend
Create `.env` file in backend directory same as `.env.example` and add your environment variables.
### Frontend
Create `config.ts` file in frontend directory same as `example.config.ts` and add your environment variables.


## License

This project is licensed under the MIT License.


## GitAds Sponsored
 [![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=dexter-ifti/pencraft@github)](https://gitads.dev/v1/ad-track?source=dexter-ifti/pencraft@github)