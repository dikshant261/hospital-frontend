# 🏥 Hospital Management System - Frontend

A modern Hospital Management System frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. The application uses **JWT Authentication**, **Role-Based Access Control (RBAC)**, and a **dynamic sidebar** where menu items are fetched from the backend based on the logged-in user's roles.

---

## 🚀 Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons
- JWT Authentication

---

## ✨ Features

- 🔐 User Login Authentication
- 🔑 JWT Token Authentication
- 🛡️ Protected Routes
- 📋 Dynamic Sidebar (Menus fetched from Backend)
- 👤 Role Based Access Control (RBAC)
- ⚡ Axios Instance with Authorization Interceptor
- 🎨 Responsive UI using Tailwind CSS
- 📱 Mobile Friendly Layout
- 🖼️ Lucide React Icons
- 🔄 React Router DOM Navigation

---

## 📂 Project Structure

```
src/
│
├── api/
│   └── axiosInstance.ts
│
├── assets/
│
├── components/
│   ├── Sidebar.tsx
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   
│   │
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   │
│   ├── Appointments.tsx
│   ├── Dashboard.tsx
│   ├── Doctors.tsx
│   ├── Patients.tsx
│   └── Users.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/hospital-frontend.git
```

Go to project folder

```bash
cd hospital-frontend
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_URL=http://localhost:3000
```

---

# ▶️ Run Project

Start development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🔑 Authentication Flow

```
Login
   │
   ▼
Backend Authentication
   │
   ▼
JWT Token
   │
   ▼
Store Token in Local Storage
   │
   ▼
Axios Interceptor
   │
   ▼
Protected Routes
```

---

# 📋 Dynamic Sidebar

After successful login, the frontend requests the authenticated user's menus from the backend.

```
GET /menus
```

Example Response

```json
[
    {
        "title":"Dashboard",
        "path":"/dashboard",
        "icon":"LayoutDashboard"
    },
    {
        "title":"Doctors",
        "path":"/doctor",
        "icon":"Stethoscope"
    },
    {
        "title":"Patients",
        "path":"/patients",
        "icon":"Users"
    }
]
```

The sidebar is generated dynamically using the received menu data.

---

# 🛣️ Routing

The application uses **React Router DOM** for client-side routing.

```
/
├── Login
├── Dashboard
├── Doctors
├── Patients
├── Profile
└── Settings
```

Protected routes ensure that only authenticated users can access the dashboard.

---

# 🌐 Axios Configuration

A reusable Axios instance is configured to:

- Set the backend base URL
- Automatically attach JWT tokens
- Handle unauthorized responses

---

# 🎨 Icons

The application uses **Lucide React** for modern and customizable icons.

---

# 📦 Dependencies

```bash
npm install react-router-dom
npm install axios
npm install lucide-react
npm install tailwindcss
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Build project |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

# 📌 Future Enhancements

- Dashboard Analytics
- Doctor Management
- Patient Management
- Appointment Scheduling
- Billing Module
- Pharmacy Module
- Laboratory Module
- Notifications
- Dark Mode
- Profile Management
- Refresh Token Authentication

---


---

# 👨‍💻 Author

**Dikshant Dhiman**
