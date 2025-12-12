# Homzi

Homzi is a home-maintenance marketplace that connects customers with nearby service hubs, enabling real‑time booking, professional onboarding, and admin management in a single React + Node.js stack.

## ✨ Features
- **Location-aware bookings** – surfaces nearby Homzi hubs, availability badges, and provider details on the booking page.
- **Professional onboarding workflow** – signup form posts to the Homzi API, storing leads with selected service center and availability notes.
- **Admin lead console** – `/admin/leads` lists submissions, supports status changes (approve/reject), availability tuning, and CSV export.
- **Modern UI kit** – blue/purple theme, responsive hero & CTA sections, marquee messaging, testimonials, and pricing tiers.
- **Mock API server** – lightweight Express backend (`server/index.js`) persisting professional leads to disk for local development.

## 🧱 Tech Stack
- **Frontend:** React 18, React Router 6, styled-components, Framer Motion
- **State & Utilities:** Context API (cart + location), custom hooks, Font Awesome icons
- **Backend:** Node.js + Express (mock API server with JSON storage)
- **Tooling:** npm, ESLint (via Create React App defaults)

## 📁 Project Layout
```
.
├── public/                # CRA static assets
├── src/
│   ├── api/               # REST client (homziApi)
│   ├── components/        # Reusable UI blocks
│   ├── context/           # Cart + location providers
│   ├── data/              # Service center metadata
│   ├── pages/             # Route-level views (Booking, Pricing, Admin, etc.)
│   └── styles/            # Global styled-components theme
├── server/                # Express mock API (professional leads)
├── temp-react/            # Original CRA scaffold retained for reference
├── .env                   # Local environment variables (not committed)
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 8+

### 1. Install dependencies
```bash
npm install
```

### 2. Frontend environment
Duplicate `.env.example` (or create `.env`) and configure the frontend API base URL if you host the server elsewhere.
```bash
REACT_APP_HOMZI_API_URL=http://localhost:4000
```

### 3. Run the mock API server
```bash
npm run server
# or manually
node server/index.js
```
By default the API listens on **http://localhost:4000**.

### 4. Start the React app
```bash
npm start
```
If port 3000 is busy (e.g., Grafana), run on an alternate port:
```bash
set PORT=3001
npm start
```

Open the app at [http://localhost:3000](http://localhost:3000) or your chosen port.

## 🔧 Useful Scripts
| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm start`           | Launch React development server          |
| `npm run build`       | Production build of the frontend         |
| `npm test`            | CRA test runner                          |
| `npm run server`      | Convenience script to start Express API  |

## 📡 API Notes
- `POST /api/professionals` – submit professional signup lead
- `GET /api/professionals?status=pending|approved|rejected` – list leads filtered by status
- `PATCH /api/professionals/:id` – update status or availability notes

Leads persist to `server/data/professionals.json`. Since this is a mock backend, reset the file if you want a fresh state.

## 🧭 Roadmap Ideas
- Hook into a production database (PostgreSQL/MongoDB) instead of the JSON store
- Add authentication for the admin dashboard
- Expand booking flow with actual timeslot selection and payments

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit changes (`git commit -m "Add awesome feature"`)
4. Push to branch (`git push origin feature/awesome`)
5. Open a Pull Request

## 📄 License
MIT © 2025 Homzi
