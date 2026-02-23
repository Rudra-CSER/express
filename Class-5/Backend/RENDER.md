# Render hosting setup

Use these settings in the Render dashboard so the app builds and runs correctly.

**Important:** This must be a **Web Service** (Node), not a Static Site. Do not set Publish Directory.

## Root directory

- **Root Directory:** `Backend` (so Render runs all commands from the Backend folder).

## Build & start (must match this exactly)

With **Root Directory** = `Backend`:

| Setting          | Value |
|------------------|--------|
| **Build Command**  | `npm install && npm run build` |
| **Start Command**  | `npm start` |
| **Publish Directory** | Leave **blank** (required for Web Services) |

- Do **not** use `npm run dev` as Build or Start — that runs the dev server and is not for production ([Render docs](https://render.com/docs/troubleshooting-deploys)).
- If you already commit `Backend/public/dist` to GitHub, you can use Build Command: `npm install` only (skip `npm run build`).

## Environment variables

In Render: **Environment** tab → add:

| Key        | Value                    | Notes                          |
|-----------|---------------------------|--------------------------------|
| `MONGO_URI` | your MongoDB connection string | **Required** for DB connection |
| `PORT`      | (optional)                | Render sets this automatically |

Copy from `.env.example` and set real values in the Render dashboard (do not commit `.env`).

## Summary

- **Entry file:** `server.js` (see `main` in `package.json`).
- **Build:** Installs Frontend deps, builds Frontend, copies `Frontend/dist` → `Backend/public/dist`.
- **Start:** `node server.js` (uses `process.env.PORT` on Render).
