# MindWave - AI-Based Mental Well-being Platform

MindWave is a full-stack MERN application designed to be a comprehensive mental well-being platform. It connects patients with doctors and hospitals, provides an AI-powered chatbot for emotional support, and allows users to track their mood and progress over time.

## Features

-   **User Roles:** User, Doctor, Hospital Admin, and Super Admin with role-based access control.
-   **Authentication:** JWT-based authentication with access and refresh tokens.
-   **AI Chatbot:** An empathetic AI chatbot for immediate support.
-   **Mood Tracking:** Users can log their mood and view trends over time.
-   **Appointment Booking:** (Mocked) Users can book, view, and manage appointments with doctors.
-   **Real-time Chat:** Socket.IO-powered real-time chat between users and doctors.
-   **Dockerized:** The entire application is containerized for easy setup and deployment.

## Tech Stack

**Frontend:**

-   React 18+ with TypeScript
-   Vite
-   React Router v6
-   Zustand for state management
-   React Query for data fetching
-   TailwindCSS for styling
-   Axios for HTTP requests
-   Socket.IO Client

**Backend:**

-   Node.js 18+ with Express and TypeScript
-   MongoDB with Mongoose
-   Socket.IO Server
-   JWT for authentication
-   bcryptjs for password hashing
-   Zod for validation

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or higher)
-   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Local Development (with Docker)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mindwave.git
    cd mindwave
    ```

2.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and copy the contents of `.env.example`.

3.  **Run the application:**
    ```bash
    docker-compose up --build
    ```
    The application will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### Local Development (without Docker)

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up MongoDB:**
    Make sure you have a local MongoDB instance running.

3.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and copy the contents of `.env.example`. Update the `MONGO_URI` if your MongoDB instance is not running on the default port.

4.  **Run the application:**
    ```bash
    npm run dev:all
    ```

## Environment Variables

The `.env.example` file contains all the necessary environment variables. Copy this file to `.env` and fill in the values.

-   `MONGO_URI`: Your MongoDB connection string.
-   `JWT_SECRET`: A secret key for signing JWTs.
-   `PORT`: The port for the backend server.
-   `OPENAI_API_KEY`: (Optional) Your OpenAI API key for the AI chatbot.

## Seeding the Database

To populate the database with mock data, run the following command:

```bash
npm run seed
```

This will create a set of users, doctors, hospitals, and appointments.
