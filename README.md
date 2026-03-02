# Product Manager (Angular)

A mini product management application created as a technical task.

---

## 📦 Tech Stack

- Angular 21 (standalone components + router)
- Angular Material – UI
- NgRx SignalStore – state management + async handling
- json-server – mock REST API
- TypeScript

---

## ✅ Features

- Product list
- Filter by name
- Filter by category
- Sort by price (ASC / DESC)
- Add product (dialog + Reactive Forms)
- Edit product (click table row)
- Async API calls with state management

Product model:

```
id
name
price
category
stock
isActive
```

---

## 🚀 Run the Project

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Run mock API

```
npm run api
```

API will be available at:

```
http://localhost:3001/products
```

### 3️⃣ Run frontend

In another terminal:

```
npm start
```

App:

```
http://localhost:4200/products
```

---

## 📁 Project Structure

```
src/app/
  core/              → API configuration
  shared/            → utilities
  products/
    data-access/     → API + SignalStore
    ui/              → components + dialog
```

---

## 🧠 Architecture

- SignalStore manages products, filters, sorting, loading, and errors
- ProductsApi handles CRUD operations via HttpClient
- Angular Material provides table and dialog UI
- json-server simulates backend

Feature-based structure for clarity and scalability.

---

## 🧪 Tests

```
npm test
```
