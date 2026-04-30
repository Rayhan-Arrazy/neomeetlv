# NeoMeet

> A meeting and scheduling web app built with **Laravel 12** and **TypeScript**.

---

### What it does

NeoMeet lets users schedule, manage, and join meetings through a clean web interface. The Laravel backend handles routing, authentication (via Breeze + Sanctum), and data persistence, while a TypeScript frontend delivers a responsive UI.

---

### Tech

![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Pest](https://img.shields.io/badge/Pest-tests-blue?style=flat-square)

---

### Setup

**Requirements:** PHP 8.2+ · Composer · MySQL · Node.js

```bash
git clone https://github.com/Rayhan-Arrazy/neomeetlv.git
cd neomeetlv
```

**Install dependencies**

```bash
composer install
npm install
```

**One-command setup** *(runs install → .env copy → key gen → migrate → build)*

```bash
composer run setup
```

Or manually:

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env`:

```env
DB_DATABASE=neomeetdb
DB_USERNAME=root
DB_PASSWORD=your_password
```

```bash
php artisan migrate
npm run build
```

---

### Run

```bash
# Single command — starts server, queue, logs, and Vite together
composer run dev
```

App available at → `http://localhost:8000`

---

### Test

```bash
composer run test
# or
php artisan test
```

---

### Structure

```
neomeetlv/
├── app/                  # Models, Controllers, Middleware
├── backend/              # Additional backend services
├── database/
│   ├── migrations/       # Schema definitions
│   └── seeders/
├── resources/views/      # Blade templates
├── routes/               # web.php, api.php
└── tests/                # Pest feature & unit tests
```
