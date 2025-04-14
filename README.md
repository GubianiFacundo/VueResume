# VueResume

A full-stack project for building a professional resume using **Vue.js** for the frontend and **NestJS** for the backend.

## 📄 About This Project
This project was created as a way to showcase my skills as a professional software developer. My goal was to demonstrate the breadth and depth of what I’ve learned over the years, while maintaining a minimal and clean implementation. The result is this interactive resume — a personal project that blends practical design with technical precision.

While I followed best practices and industry standards throughout the build, you’ll also notice some custom-built components and features that reflect my unique approach and problem-solving style.

## 🧩 What’s Included
I aimed to integrate everything I could think of that represents a modern, full-stack application. Here's a breakdown of the technologies and tools used:

### Frontend
+ **Vue.js 3** with the Composition API (setup syntax)

+ **Vite** for fast and optimized development

+ **Vitest** for unit testing

+ **Pinia** as the state management library

+ **Vuetify** for UI components

+ **Cypress** for E2E testing

+ Various related libraries and components

### Backend
+ **NestJS** as the backend framework

+ **Jest** for backend unit and integration tests

+ **TypeORM** for database interactions

Other common backend tools and libraries

### DevOps / Deployment
+ **Docker** for containerization

+ **Nginx** for reverse proxy and serving static content

+ Deployed on an **AWS cluster**, fully containerized and scalable

## Project Structure

## Features

- **Frontend**:
  - Built with **Vue 3** and **TypeScript**.
  - Responsive design for a professional resume.
  - Dynamic sections for About, Contact, and more.

- **Backend**:
  - Built with **NestJS** and **TypeORM**.
  - PostgreSQL database integration.
  - RESTful API for managing resources like jobs, education, and skills.

## Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **PostgreSQL** (for the backend)

## Installation

### Clone the Repository

```bash
  git clone https://github.com/GubianiFacundo/VueResume.git
  cd VueResume
```

#### Backend Setup

1 - Navigate to the server folder and install dependencies:

```bash
  cd server
  npm install
```

2 - Configure the .env file:
Create a .env file in the server folder with the following variables:

```bash
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USER=your_user
  DATABASE_PASSWORD=your_password
  DATABASE_NAME=your_database
```

3 - Run database migrations:
  This should create DB, Create Tables, and populate them.

```bash
  npm run migrate
```

4 - Start the backend server:

```bash
  npm run start:dev
```

#### Frontend Setup

1 - Navigate to the vue-project-cv folder and install dependencies:

```bash
  cd vue-project-cv
  npm install
```

2 - Start the development server:

```bash
  npm run dev
```

### Usage

Open the frontend in your browser:

```bash
  http://localhost:5173
```
The backend API will be running at:

```bash
  http://localhost:3000
```

## Author **Facundo Gubiani**

[LinkedIn](https://www.linkedin.com/in/facundo-gubiani/) - [GitHub](https://github.com/GubianiFacundo)