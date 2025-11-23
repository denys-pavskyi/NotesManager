# NotesManager Docker Installation

This project provides a trading application backend with MSSQL database, fully containerized with Docker.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed (usually comes with Docker Desktop)

---

## How to run the solution

Follow these steps to run the entire solution using Docker:

### 1. Clone the repository

```bash
git clone https://github.com/denys-pavskyi/NotesManager.git

cd NotesManager/Backend  (main root folder)
```

### 2. Build and start the containers

```bash
docker-compose up --build
```

This command will:
 - Build the ASP.NET API Docker image,
 - Pull the MSSQL image,
 - Start both containers and create a Docker network between them,
 - Apply any pending Entity Framework migrations automatically.
 


### 3. Frontend Setup (React + Vite)

#### 1) Navigate to the frontend directory

```bash
cd NotesManager/Frontend
```

#### 2) Install dependencies

```bash
npm install
```

#### 3) Start the development server

```bash
npm run dev
```

The frontend will start on the default Vite port:
Frontend URL: http://localhost:5173



### 4. End-to-End (E2E) Tests with Cypress

#### 1) Navigate to the frontend folder

```bash
cd NotesManager/Frontend
```

#### 2) Run Cypress tests in headless mode (without opening cypress client)

```bash
npx cypress run --headless
```

This command will run all tests