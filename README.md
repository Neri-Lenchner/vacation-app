# Vacations App

A full-stack vacations management app built with React, Node.js/Express, and MySQL.

## Project Structure

```
├── vacations-NodeJS-final-version/   # Backend (Express + TypeScript)
├── vacations-React-final-version/    # Frontend (React + TypeScript)
├── db/
│   └── init.sql                # Database schema & seed data
├── docker-compose.yml
└── .env.example                # Environment variable template
```

---

## Option 1 — Run with Docker (recommended)

Dev setup with hot reload — any file change is reflected instantly without rebuilding.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Steps

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in your values:
   ```
   MYSQL_ROOT_PASSWORD=your-root-password
   DB_NAME=vacations
   DB_TIMEZONE=+00:00
   JWT_SECRET=your-secret-key
   ```

3. Start all services:
   ```bash
   docker-compose up --build
   ```

4. Open the app at [http://localhost:3000](http://localhost:3000)

> The database is initialized automatically from `db/init.sql` on first run.
> To stop: `docker-compose down`

---

## Option 2 — Run Locally (without Docker)

### Prerequisites
- Node.js 20+
- MySQL 8.0 running locally

### Backend

1. ```bash
   cd vacations-NodeJS-final-version
   npm install
   ```

2. Create the env file:
   ```bash
   cp .env.example .env
   ```
   Fill in `.env`:
   ```
   DB_HOST=localhost
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=vacations
   DB_TIMEZONE=+00:00
   JWT_SECRET=your-secret-key
   PORT=4000
   ```

3. Import the database schema into MySQL:
   ```bash
   mysql -u root -p < ../db/init.sql
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Backend runs on [http://localhost:4000](http://localhost:4000)

### Frontend

1. ```bash
   cd vacations-React-final-version
   npm install
   ```

2. Create the env file:
   ```bash
   cp .env.example .env.development
   ```
   Fill in `.env.development`:
   ```
   REACT_APP_SERVER_ADDRESS=http://localhost:4000
   ```

3. Start the dev server:
   ```bash
   npm start
   ```
   Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

### Root `.env` (Docker only)
| Variable             | Description                     |
|----------------------|---------------------------------|
| MYSQL_ROOT_PASSWORD  | MySQL root password             |
| DB_NAME              | Database name                   |
| DB_TIMEZONE          | Database timezone (e.g. +00:00) |
| JWT_SECRET           | Secret key for JWT signing      |

### Backend `.env`
| Variable     | Description              |
|--------------|--------------------------|
| DB_HOST      | MySQL host               |
| DB_USER      | MySQL user               |
| DB_PASSWORD  | MySQL password           |
| DB_NAME      | Database name            |
| DB_TIMEZONE  | Timezone (e.g. +00:00)   |
| JWT_SECRET   | Secret key for JWT       |
| PORT         | Port to run backend on   |

### Frontend `.env.development` / `.env.production`
| Variable                  | Description            |
|---------------------------|------------------------|
| REACT_APP_SERVER_ADDRESS  | Backend server URL     |
