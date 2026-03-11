# 🍔 FoodStore — Full-Stack Food Delivery Platform

<div align="center">

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A Zomato-inspired food delivery platform built with the MERN stack**

</div>

---

## ✨ Features

- 🏪 **12+ Restaurants** with full menus (40+ food items)
- 🔍 **Smart Search** — search by food name, category, or restaurant
- 🛒 **Cart Management** — add, remove, update quantities with local persistence
- 🔐 **JWT Authentication** — secure login & registration with bcrypt
- 📦 **Order Tracking** — real-time status updates (pending → delivered)
- 🌙 **Dark/Light Mode** — system-preference aware theme toggle
- 📱 **Fully Responsive** — mobile drawer navigation, adaptive layouts
- ✨ **Framer Motion** — smooth page transitions, card animations, scroll reveals
- 💎 **Glassmorphism UI** — modern frosted glass cards and gradients
- ⭐ **Reviews & Ratings** — per-restaurant and per-food reviews
- 🔥 **Featured Content** — curated featured dishes and restaurants on homepage

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **TailwindCSS 3** | Utility-first styling |
| **Framer Motion** | Animations |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client |
| **React Hot Toast** | Notifications |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/needproject-ceo/Food-store.git
cd Food-store
```

**2. Install all dependencies**
```bash
npm run install-all
```

**3. Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```
```env
MONGO_URI=mongodb://localhost:27017/foodstore
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

**4. Seed the database**
```bash
npm run seed
```
This will populate 12 restaurants, 40+ food items, and sample data.

**5. Start the development server**
```bash
npm run dev
```

🌐 Frontend: [http://localhost:5173](http://localhost:5173)  
🔧 Backend API: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
Food-store/
├── 📄 package.json          # Root — runs client + server with concurrently
├── 📄 .env.example          # Environment variable template
├── 📄 .gitignore
│
├── 📂 server/               # Express backend
│   ├── server.js            # Entry point
│   ├── 📂 config/           # MongoDB connection
│   ├── 📂 models/           # Mongoose schemas
│   │   ├── User.js
│   │   ├── Food.js
│   │   ├── Restaurant.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Review.js
│   ├── 📂 controllers/      # Route handlers
│   ├── 📂 routes/           # Express routers
│   ├── 📂 middleware/       # JWT auth, error handler
│   └── 📂 seeds/            # Database seeder
│
└── 📂 client/               # React + Vite frontend
    ├── index.html
    ├── 📂 src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── 📂 context/      # Auth, Cart, Theme providers
    │   ├── 📂 hooks/        # Custom hooks
    │   ├── 📂 utils/        # Axios instance
    │   ├── 📂 components/   # Reusable UI components
    │   └── 📂 pages/        # Route pages
```

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (auth required) |
| PUT | `/api/auth/profile` | Update user profile (auth required) |

### Restaurants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | List all restaurants |
| GET | `/api/restaurants/:id` | Get restaurant details |
| POST | `/api/restaurants` | Create restaurant (admin) |

### Foods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | List foods (supports `?category=`, `?restaurant=`, `?search=`, `?featured=true`) |
| GET | `/api/foods/categories` | Get all categories |
| GET | `/api/foods/:id` | Get food details |
| POST | `/api/foods` | Create food (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (auth required) |
| GET | `/api/orders/my` | Get user's orders |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id/cancel` | Cancel order |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:itemId` | Update item quantity |
| DELETE | `/api/cart/:itemId` | Remove item |
| DELETE | `/api/cart` | Clear cart |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get reviews (supports `?restaurant=`, `?food=`) |
| POST | `/api/reviews` | Create review (auth required) |
| DELETE | `/api/reviews/:id` | Delete review |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#E23744` | Brand color, CTAs, ratings |
| `secondary` | `#FF6B35` | Gradients, highlights |
| `accent` | `#FFD700` | Stars, accents |
| `dark` | `#1A1A2E` | Dark mode bg, hero bg |
| `light` | `#F8F9FA` | Light mode bg |

**Fonts:** Poppins (headings) · Inter (body)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
Made with ❤️ by the FoodStore team · Built with React, Node.js, Express, MongoDB, TailwindCSS &amp; Framer Motion
</div>
