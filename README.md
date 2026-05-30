# 🚀 NeoMeet

NeoMeet is a premium, high-performance virtual learning and meeting platform built with a unified **Laravel 12**, **Vue 3**, and **Inertia.js** stack. It features a stunning glassmorphic design system powered by **Tailwind CSS v4** and real-time video conferencing.

---

## ✨ Features

- **📺 Real-Time Meetings**: High-quality video, audio, and screen sharing integrated via Jitsi Meet SDK.
- **🎓 Virtual Classes**: Comprehensive class management with study materials and lecture tracking.
- **🔐 Advanced RBAC**: Role-Based Access Control (Admin, Instructor, Student) with secure Gates and Policies.
- **💎 Premium Design**: Modern "Glassmorphism" UI with dark mode, animated background blobs, and smooth Inertia.js transitions.
- **⚡ Unified Stack**: Single-repository architecture using Vite for lightning-fast development and deployment.
- **🗄️ Scalable Database**: Fully configured for PostgreSQL (Supabase ready).

---

## 🛠️ Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: Vue 3 (Composition API) + Inertia.js
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Auth**: Laravel Breeze + Sanctum (Session & Token based)
- **Database**: PostgreSQL / Supabase
- **Testing**: Pest PHP

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Rayhan-Arrazy/neomeetlv.git
cd neomeetlv

# Install PHP dependencies
composer install

# Install JS dependencies
npm install
```

### 2. Environment Setup

Update your `.env` file with your PostgreSQL/Supabase credentials. **Note**: If using Supabase, ensure you use the **Connection Pooler (IPv4)** on port `6543`.

```env
DB_CONNECTION=pgsql
DB_HOST=your-supabase-pooler-host
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.your-project-id
DB_PASSWORD=your-password
```

### 3. Database Migration & Seeding

```bash
php artisan migrate --seed
```

---

## 🏃 Running the Application

NeoMeet uses a unified development command to start everything at once:

```bash
composer dev
```

This starts:
- **Laravel Server** on `http://localhost:8000`
- **Vite Dev Server** for hot-module replacement
- **Queue Worker** for background tasks
- **Pail** for real-time logging

---

## 🔑 Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Instructor** | `john.smith@example.com` | `instructor123` |
| **Student** | `alice@example.com` | `student123` |

---

## 📁 Project Structure

```
neomeetlv/
├── app/                  # Logic: Models, Controllers, Gates
├── config/               # Application configuration
├── database/             # Migrations and Seeders
├── resources/js/         # Vue 3 Components & Inertia Pages
│   ├── Pages/            # Dashboard, MeetingRoom, ClassDetail, etc.
│   ├── Layouts/          # Authenticated & Guest layouts
│   └── Components/       # Reusable UI elements
├── routes/               # Web & API route definitions
└── tests/                # Pest feature & unit tests
```

---

Built with ❤️ by the NeoMeet Team.
