# Loan App

A full-stack web application built with **Next.js** for the frontend and **Express.js** for the backend, featuring authentication using **Firebase**. The project utilizes **TypeScript**, **ShadCN UI components**, and **Tailwind CSS** for the frontend design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [Demo](#demo)
- [Contributing](#contributing)

## Features

- User authentication using Firebase (Login and Registration).
- Modern UI design with ShadCN and Tailwind CSS.
- Fully responsive design.
- TypeScript support for better type safety.
- API integration with a robust Express.js backend.

## Technologies Used

### Frontend:
- **Next.js** (React Framework)
- **TypeScript** (Strongly-typed JavaScript)
- **Tailwind CSS** (Utility-first CSS framework)
- **ShadCN** (UI Components)

### Backend:
- **Express.js** (Web application framework for Node.js)

### Authentication:
- **Firebase** (User Authentication and API integration)

## Project Structure

Demo:
A video demonstration of the application is available [here](https://www.dropbox.com/scl/fi/nwjngsk4nx0u5ateiw759/2024-11-20-22-54-33.mkv?rlkey=40teva57jgd8z7c07llgqf09y&st=wp77p575&dl=0).

### Frontend:
```plaintext
/frontend
 /app
  ├── /_components
  ├── /Context
  ├── /admin
  ├── /firebase
  ├── layout.tsx
  └── page.tsx
/backend
  ├── /controllers
  ├── /routes
  ├── /models
  ├── /utils
  ├── server.js
  └── package.json ```

# Setup Instructions
Prerequisites:
- **Node.js** installed on your machine.
- A **Firebase project** configured for authentication.
---
## Steps:
### 1. Clone the Repository
git clone https://github.com/your-repo-name.git
cd your-repo-name

2.Install Dependencies
Navigate to both the frontend and backend folders and run:
-> npm install

3. Add Firebase Configuration
Create a .env.local file in the frontend folder and add the following keys (replace with your Firebase project values)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

4.Add Backend MongoDB Url local or altas in .env.
MONGO_URL=

5.Run Backend.
->cd Backend
->npm run start

6.Run frotend.
cd frontend
npm run dev





