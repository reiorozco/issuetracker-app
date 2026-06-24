<h1 align="center">🐞 Issue Tracker</h1>

<p align="center">
  A full-stack issue tracking application — create, assign and monitor issues with dashboards and charts.
</p>

<p align="center">
  <a href="https://issue-tracker-app-blue.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/></a>
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge"/>
</p>

## 🔗 Live Demo

👉 **[issue-tracker-app-blue.vercel.app](https://issue-tracker-app-blue.vercel.app)**

## ✨ Features

- 🔐 Authentication with NextAuth (Google OAuth)
- 📝 Create, edit and delete issues with a Markdown editor
- 👤 Assign issues to users
- 📊 Dashboard with status summary and charts (Recharts)
- 🔎 Filtering, sorting and pagination
- 🧰 Error monitoring with Sentry
- ✅ Form validation with Zod + React Hook Form

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) · TypeScript
- **Database / ORM:** MySQL · Prisma
- **Auth:** NextAuth.js (Google provider)
- **UI:** Radix UI Themes · Tailwind utilities
- **Data:** TanStack Query · Axios
- **Validation:** Zod · React Hook Form
- **Monitoring:** Sentry

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A database supported by Prisma (e.g. MySQL/PostgreSQL)
- Google OAuth credentials

### Installation
```bash
git clone https://github.com/reiorozco/issuetracker-app.git
cd issuetracker-app
npm install
```

### Environment variables
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database & run
```bash
npx prisma migrate dev   # apply migrations
npm run dev              # start dev server (http://localhost:3000)
npm run build            # production build
```

## 📸 Screenshots

> _Add screenshots or a short GIF of the dashboard and issue views here._

## 📄 License

Released under the [MIT License](LICENSE).
