# Urformance — Monorepo

> **Frontend** (Vanilla HTML/CSS/JS) + **Backend** (NestJS API + Google Sheets)

---

## Project Structure

```
Urformance/
├── frontend/                  # Static HTML storefront + VTO mockups
│   ├── index.html
│   ├── virtual-try-on-ar.html
│   ├── virtual-try-on-complete.html
│   └── virtual-try-on-showcase.html
├── backend/                   # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── common/guards/api-key.guard.ts
│   │   ├── config/configuration.ts
│   │   ├── orders/            # Orders module
│   │   │   ├── dto/create-order.dto.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.module.ts
│   │   │   └── orders.service.ts
│   │   └── sheets/            # Google Sheets integration
│   │       ├── sheets.module.ts
│   │       └── sheets.service.ts
│   ├── .env                   # Real secrets (gitignored)
│   ├── .env.example           # Template
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
├── package.json               # Root monorepo scripts
└── README.md
```

---

## Backend Setup

### 1. Install dependencies

```bash
npm run install:backend
# or
cd backend && npm install
```

### 2. Configure environment variables

Copy `.env.example` → `.env` and fill in the values:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description |
|---|---|
| `PORT` | Server port (default `3000`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |
| `API_KEY` | Secret clients must send as `X-API-Key` header |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email from GCP |
| `GOOGLE_PRIVATE_KEY` | Service account private key (JSON format) |
| `GOOGLE_SHEET_ID` | Spreadsheet ID from the URL |
| `GOOGLE_ORDERS_SHEET` | Tab name for orders (default: `Orders`) |
| `GOOGLE_ITEMS_SHEET` | Tab name for order items (default: `OrderItems`) |

### 3. Google Sheets Setup

Create **two tabs** in your spreadsheet:

**Tab 1 — `Orders`** (order header)

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| OrderID | Timestamp | Name | Phone | Address | Total (THB) | Items Count | Slip | Note |

**Tab 2 — `OrderItems`** (one row per item, linked by OrderID)

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| OrderID | SKU | Model | Color | Size | Qty | Unit Price | Subtotal |

Share the spreadsheet with your **service account email** (Editor access).

### 4. Start the server

```bash
# Development (watch mode)
npm run dev:backend

# Production
npm run start:backend
```

---

## API

### `POST /api/orders`

**Headers:**
```
X-API-Key: <your API_KEY>
Content-Type: multipart/form-data
```

**Body (multipart/form-data):**

| Field | Type | Required | Description |
|---|---|---|---|
| `slip` | Image file | ✅ | Payment slip — max 5 MB |
| `order` | JSON string | ✅ | Serialised order payload (see below) |

**Order payload shape:**
```json
{
  "customer": {
    "name": "Somchai Jaidee",
    "phone": "0812345678",
    "address": "123 Bangkok 10110"
  },
  "items": [
    {
      "sku": "URFP-BLK-M",
      "model": "Performance Pro",
      "color": "Black",
      "size": "M",
      "qty": 2,
      "unitPrice": 890
    }
  ],
  "note": "Please gift wrap"
}
```

**Success response (201):**
```json
{
  "success": true,
  "orderId": "ORD-1712345678901",
  "total": 1780,
  "message": "Order saved successfully."
}
```

**Error responses:**
| Status | Cause |
|---|---|
| `403` | Missing or invalid `X-API-Key` header |
| `400` | Invalid JSON, missing required fields, no slip image |
| `500` | Google Sheets write failure |

---

## Local Testing

```bash
# Valid request ✅
curl -X POST http://localhost:3000/api/orders \
  -H "X-API-Key: change-me-to-a-strong-random-secret" \
  -F 'order={"customer":{"name":"Test","phone":"0812345678","address":"Bangkok"},"items":[{"sku":"URFP-BLK-M","model":"Performance Pro","color":"Black","size":"M","qty":1,"unitPrice":890}]}' \
  -F "slip=@/path/to/slip.jpg"

# Missing API key ❌ → 403
curl -X POST http://localhost:3000/api/orders \
  -F 'order={}' -F "slip=@/path/to/slip.jpg"
```
