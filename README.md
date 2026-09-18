# 🚀 Stackline Studio — Full-Stack Web Application & Admin Control Panel

A modern, high-performance studio website built with React, Vite, TailwindCSS, Express.js, and MongoDB.

---

## 🔑 Admin Login Credentials

To access the Admin Control Panel (`/admin` or `/admin/login`):

* **Admin Email:** `rababzahra425@gmail.com`
* **Default Password:** `admin123`

---

## ❓ Why is `npm run seed` used?

### **1. Automatic Seeding on Server Startup**
When you start the backend server (`npm run dev` in the `/server` directory), the database connection initializer (`config/db.js`) automatically checks MongoDB. If default superadmin accounts do not exist, it automatically creates `rababzahra425@gmail.com` with the default password `admin123`.

### **2. Why `npm run seed` (`node scripts/seedAdmin.js`) exists**
`npm run seed` is a dedicated CLI utility script provided for administrative convenience:
* **Manual Reset & Account Recovery:** If you ever change or forget the admin password, or if you clear/reset your MongoDB database, running `npm run seed` in the `server/` directory will instantly restore or update the superadmin account with `rababzahra425@gmail.com` / `admin123`.
* **Zero Server Overhead:** It seeds the database directly via standalone CLI execution without needing to start the Express HTTP web server.

---

## 🛠️ Getting Started & Local Development

### **1. Prerequisites**
* **Node.js:** v18+
* **MongoDB:** Local instance running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI.

---

### **2. Running the Backend Server**
```bash
cd server
npm install
npm run seed  # (Optional: Seeds/Resets admin credentials explicitly)
npm run dev   # Starts Express backend on http://localhost:5000
```

---

### **3. Running the Frontend Application**
```bash
cd frontend
npm install
npm run dev   # Starts Vite React frontend on http://localhost:5173
```

---

## 📁 Repository Architecture

* `frontend/`: React + Vite client application with public showcase pages (`/`, `/work`, `/about`, `/service`, `/talk`) and secure `/admin` management routes.
* `server/`: Express.js REST API server handling authentication, inquiries submission, services, portfolio project showcase, client reviews, and email alerts via Nodemailer.
