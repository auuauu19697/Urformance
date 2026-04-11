# Urformance Monorepo

```
Urformance/
├── .gitignore              ← root (ignores node_modules, .env, OS files)
├── package.json            ← root (workspace scripts: dev:backend, start:backend)
├── README.md
├── frontend/
│   ├── .gitignore
│   └── index.html          ← original storefront, finalSubmit() now POSTs to API
└── backend/
    ├── .env.example        ← committed template (fill & copy to .env)
    ├── .gitignore          ← .env and node_modules gitignored
    ├── package.json
    └── src/
        ├── server.js       ← HTTP entry point + graceful shutdown
        ├── app.js          ← Express setup (CORS, routes, error handler)
        ├── config/
        │   └── env.js      ← validates required env vars at startup
        ├── routes/
        │   └── orders.js   ← POST /api/orders
        ├── controllers/
        │   └── orderController.js
        ├── services/
        │   └── sheetsService.js  ← Google Sheets API via service account
        ├── middleware/
        │   ├── upload.js   ← multer (memory, 5 MB, images only)
        │   └── errorHandler.js
        └── utils/
            └── response.js ← sendSuccess / sendError helpers
```

## How to Get Started

### 1. Set up your `.env`

```bash
cd backend
cp .env.example .env
# Edit .env with your real Google credentials
```

Fill in:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — from GCP service-account JSON
- `GOOGLE_PRIVATE_KEY` — from GCP service-account JSON (keep the `\n` newlines)
- `GOOGLE_SHEET_ID` — from your Google Sheet URL
- `ALLOWED_ORIGIN` — your frontend URL (default: `http://localhost:5500`)

> [!IMPORTANT]
> **Share the sheet with your service-account email** (Editor access) or the API will return a 403.

### 2. Run the backend

```bash
cd backend
npm run dev    # development (nodemon — auto-restarts on changes)
# or
npm start      # production
```

Server starts on `http://localhost:3000`.

### 3. Open the frontend

Open `frontend/index.html` with VS Code Live Server (or any static file server on port 5500). The `API_URL` constant at the top of the script points to `http://localhost:3000`.

### 4. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Submit a test order (replace path/to/slip.png with a real image)
curl -X POST http://localhost:3000/api/orders \
  -F 'order={"customer":{"name":"Test User","phone":"0800000000","address":"Bangkok"},"items":[{"model":"Performance Pro T-Shirt","size":"M","qty":1,"price":890}],"total":890}' \
  -F 'slip=@/path/to/slip.png'
```

## Google Sheet Setup

Create a new Google Sheet with these column headers in Row 1:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Phone | Address | Items | Total (THB) | Slip Filename |
