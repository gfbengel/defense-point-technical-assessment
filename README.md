# Recipe App

This repository contains a full-stack recipe application with a backend API and a frontend client. This is part of a technical assessment.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) package manager
- [Docker](https://www.docker.com/) and Docker Compose

## Getting Started

### 1. Install Dependencies

First, install all the required dependencies using pnpm:

```bash
pnpm install
```

### 2. Environment Setup

Before running the application, you need to set up the environment variables:

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Required variables:
```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=recipe-app-db

# Database URL
DATABASE_URL=postgresql://admin:admin@localhost:5432/recipe-app-db

# Backend API
SERVER_PORT=3333

# Frontend Configuration
VITE_PORT=5173
VITE_API_URL=http://localhost:3333
```

The environment variables will be automatically loaded for both the backend and frontend applications from the root `.env` file.


### 3. Database Setup

The application uses PostgreSQL as its database, which is configured using Docker Compose.

1. Start the database:
```bash
docker compose up -d
```

This will start a PostgreSQL instance with the following configuration:
- Port: 5432
- Username: postgres
- Password: postgres
- Database: recipe_app

2. Run database migrations:
```bash
pnpm be drizzle:migrate
```

3. Seed the database with initial data:
```bash
pnpm be drizzle:seed
```
This will populate the database with sample recipes, ingredients, and their relationships.

### 4. Starting the Application

The application consists of two parts: the backend API and the frontend client.

#### Backend

To start the backend in development mode:

```bash
pnpm be start:dev
```

The backend API will be available at `http://localhost:3333`.

#### Frontend

To start the frontend development server:

```bash
pnpm fe dev
```

The frontend application will be available at `http://localhost:5173`.
