# Copilot Instructions for Food-Store

## Project Overview

Food-Store is a full-stack, Zomato-inspired food delivery platform. It allows users to browse restaurants, view menus, place orders, and track deliveries.

### Tech Stack

- **Frontend:** React, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose ODM)

## Project Structure

- `/client` — React frontend application
- `/server` — Express backend API
- `/server/models` — Mongoose models
- `/server/routes` — Express route handlers
- `/server/controllers` — Business logic controllers
- `/server/middleware` — Express middleware (auth, error handling, etc.)
- `/client/src/components` — React components
- `/client/src/pages` — Page-level React components
- `/client/src/hooks` — Custom React hooks
- `/client/src/context` — React context providers

## Build & Run

- Install all dependencies: `npm install` (in both `/client` and `/server`)
- Start backend dev server: `npm run dev` (from `/server`)
- Start frontend dev server: `npm start` (from `/client`)
- Run backend tests: `npm test` (from `/server`)
- Run frontend tests: `npm test` (from `/client`)

## Coding Standards

- Use **ES module** syntax (`import`/`export`) for both frontend and backend.
- Use `async/await` for asynchronous operations; avoid `.then().catch()` chains.
- Use **functional components** and **React hooks** — do not use class components.
- Use **TailwindCSS** utility classes for styling; avoid writing custom CSS unless absolutely necessary.
- Use **Framer Motion** for animations and transitions.
- Follow **camelCase** for variables and functions, **PascalCase** for React components and classes.
- Keep files small and focused — one component per file.

## Architectural Patterns

- Follow **MVC** (Model-View-Controller) pattern on the backend.
- Use **RESTful** API conventions for route naming and HTTP methods.
- Centralize error handling using Express error-handling middleware.
- Use **React Context** or a state management library for shared frontend state.
- Validate request data on the backend using a validation library (e.g., Joi or express-validator).

## Do's and Don'ts

- **Do** write descriptive commit messages.
- **Do** add error handling for all async operations.
- **Do** validate all user inputs on both client and server.
- **Do** use environment variables (via `.env`) for secrets and configuration — never hard-code credentials.
- **Don't** commit `node_modules`, `.env` files, or build artifacts.
- **Don't** use `var` — prefer `const`, then `let` when reassignment is needed.
- **Don't** disable ESLint rules without a clear justification comment.

## Testing

- Write unit tests for utility functions and backend controllers.
- Write integration tests for API routes.
- Use React Testing Library for frontend component tests.
- All new features should include accompanying tests.
