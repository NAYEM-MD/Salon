# Salon (LuxeHair)

Full-stack salon booking demo: **Express + MongoDB (Mongoose)** API and **React (Create React App)** client.

## Prerequisites

- **Node.js** (LTS recommended)
- **MongoDB** running locally, or a **MongoDB Atlas** connection string

## First-time setup

From the repository root:

```bash
npm run install:all
```

This installs dependencies for both `server/` and `client/`.

## Environment

Create or edit **`server/.env`** (this file is not committed if you add it to `.gitignore`).

| Variable | Description |
|----------|-------------|
| `PORT` | API port. Use **`5000`** so it matches the client dev proxy. |
| `MONGO_URI` | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/salon` or your Atlas URI. |
| `NODE_ENV` | `development` or `production`. |

**Optional — confirmation email after payment**

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | e.g. `587` |
| `SMTP_USER` | SMTP login (often your Gmail address) |
| `SMTP_PASS` or `SMTP_PASSWORD` | App password or SMTP secret |
| `MAIL_FROM` | From header, e.g. `"LuxeHair <your.email@gmail.com>"` |

If SMTP is not set, bookings and payments still work; the UI will note that email could not be sent.

## Seed sample data (optional)

With MongoDB reachable and `MONGO_URI` set in `server/.env`:

```bash
npm run seed
```

This loads sample **services** and **hairstyles** into the database.

## How to run

You need **two terminals**, both started from the **repository root** (`Salon/`).

### 1. API server

```bash
npm run server
```

Wait until you see **MongoDB connected** and **Server running on port 5000**. If MongoDB is down or `MONGO_URI` is wrong, the process exits.

### 2. React client

```bash
npm run client
```

When compilation finishes, open **http://localhost:3000** in your browser.

The client is configured to proxy API requests to **http://localhost:5000** during development, so the backend must be running on that port.

## Quick reference

| Command | Purpose |
|---------|---------|
| `npm run install:all` | Install server + client dependencies |
| `npm run seed` | Seed services and hairstyles |
| `npm run server` | Start API with nodemon (`server/`) |
| `npm run client` | Start React dev server (`client/`) |

## Production build (client only)

```bash
cd client
npm run build
```

Serve the `client/build` folder with a static host. You will need to point the frontend at your deployed API URL (the dev `proxy` in `client/package.json` does not apply to production builds).

## Deploy to Vercel

Import this GitHub repo and keep the **root directory** as the repository root (`.`). The repo includes `vercel.json`, which installs and builds inside `client/` and publishes `client/build`.

In the Vercel project **Environment Variables**, add **`REACT_APP_API_URL`** with your live API base (must include `/api`, e.g. `https://your-api.onrender.com/api`). The Express app in `server/` is not run by Vercel; host it on Render, Railway, Fly.io, etc., with `MONGO_URI` and `PORT` set there. Until that variable is set, the deployed site will load but API calls from the browser will fail.

## Troubleshooting

- **Axios “Network Error” in the browser** — Usually the API is not running or not on port **5000**. Start `npm run server` and refresh.
- **Port already in use (`EADDRINUSE`)** — Stop the other Node process using that port, or change `PORT` in `server/.env` and update the client `proxy` in `client/package.json` to match.
