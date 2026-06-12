# Job-Tracker

A full-stack Job Application Tracker built using React.js, Flask, and MySQL. This application helps users manage and track their job applications in one place.

## Features

### Authentication

* User Registration
* User Login
* Session-Based Authentication
* Protected Routes

### Application Management

* Add New Job Applications
* View All Applications
* Update Application Status
* Delete Applications
* Dashboard Overview

### User Interface

* Responsive Design
* Modern Dashboard
* Navigation Bar
* Protected Pages

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Flask
* Flask-CORS
* Flask-Bcrypt

### Database

* MySQL

---

## Project Structure

job-tracker/

├── backend/

│ ├── app.py

│ ├── requirements.txt

│

├── frontend/

│ ├── src/

│ │ ├── pages/

│ │ ├── components/

│ │ ├── styles/

│ │ ├── api.js

│ │ └── App.jsx

│

└── README.md

---

## Database Setup

Create a database named:

```sql
CREATE DATABASE job_tracker;
```

Create users table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);
```

Create applications table:

```sql
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100),
    role VARCHAR(100),
    status VARCHAR(50),
    applied_date DATE,
    user_id INT
);
```

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install flask flask-cors flask-bcrypt mysql-connector-python
```

Run backend server:

```bash
python app.py
```

Backend runs on:

```text
http://localhost:5000
```

Terminal Output:

```text
* Running on http://127.0.0.1:5000
* Debug mode: on
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Terminal Output:

```text
VITE v7.x ready in xxx ms

➜ Local: http://localhost:5173/
```

---

## API Endpoints

### Register User

```http
POST /register
```

Request Body:

```json
{
  "username": "Jeeva",
  "email": "jeeva@gmail.com",
  "password": "123456"
}
```

### Login User

```http
POST /login
```

Request Body:

```json
{
  "email": "jeeva@gmail.com",
  "password": "123456"
}
```

### Logout User

```http
POST /logout
```

### Get Applications

```http
GET /applications
```

### Add Application

```http
POST /applications
```

Request Body:

```json
{
  "company": "Google",
  "role": "Software Engineer",
  "status": "Applied",
  "applied_date": "2026-06-12"
}
```

### Update Application

```http
PUT /applications/<id>
```

### Delete Application

```http
DELETE /applications/<id>
```

---

## Testing with Postman

### Register

```http
POST http://localhost:5000/register
```

### Login

```http
POST http://localhost:5000/login
```

### Get Applications

```http
GET http://localhost:5000/applications
```

### Add Application

```http
POST http://localhost:5000/applications
```

---

## Screenshots

### Login Page

* User authentication screen

### Dashboard

* Displays all job applications

### Add Application Page

* Form to add new applications

### Applications List

* Manage application records

---

## Learning Outcomes

* React Components
* React Router
* Protected Routes
* Axios API Integration
* Flask REST APIs
* Session Authentication
* MySQL Database Operations
* Full Stack Development

---

## Author

Jeeva V

