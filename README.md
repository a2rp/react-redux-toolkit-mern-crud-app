# Redux Toolkit MERN CRUD

A local employee-record manager built with React, Redux Toolkit, Express, and MongoDB. It supports listing, adding, editing, and deleting employee names and positions.

## Requirements

- Node.js 20.19+ or 22.12+
- MongoDB running locally, or a MongoDB connection URI

## Configure

Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env.local`. Update `MONGODB_URI` if your MongoDB instance uses a different connection string. The frontend and backend examples already use matching local ports.

## Run the backend

In one terminal:

```sh
cd backend
npm install
npm run dev
```

The API waits for MongoDB before listening at `http://localhost:1198`. The health endpoint is `GET /api`; CRUD routes are under `/api/items`.

## Run the frontend

In another terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`). The frontend reads `VITE_API_BASE_URL` and defaults to the local API URL above.

## Try the API

Use the requests in [`backend/rest.http`](backend/rest.http) with an editor REST client. Employee records contain a required name and position, each up to 120 characters.

## Preview

![Employee CRUD preview](https://github.com/a2rp/react-redux-toolkit-mern-crud-app/assets/5670738/606887cb-c499-40d0-b358-7fe8d4ecabfb)