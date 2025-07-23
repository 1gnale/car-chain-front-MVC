# Car-Chain - MVC React Proyect

## 🧠 Aplicar MVC en un proyecto React

### 🧩 1. **Modelo (Model)**

- Encapsula la **lógica de negocio y los datos**.
- Puede ser:
    - Una **API externa (REST o GraphQL)**.
    - Clases JS con lógica interna.
    - **Context, Redux** o **zustand**, si manejás estado global.

🛠 Ejemplos:

```
js
CopiarEditar
// models/PolicyModel.js
export async function fetchPolicies() {
  const res = await fetch('/api/policies');
  return res.json();
}

```

---

### 🎨 2. **Vista (View)**

- Los **componentes de React** que muestran la interfaz.
- Lo que ve el usuario.
- Acá usás HTML/JSX + CSS.

🛠 Ejemplos:

```jsx
jsx
CopiarEditar
// views/PolicyListView.jsx
export default function PolicyList({ policies }) {
  return (
    <ul>
      {policies.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

```

---

### 🧭 3. **Controlador (Controller)**

- Se encarga de **coordinar el flujo entre vista y modelo**.
- Puede estar en:
    - Un componente contenedor (container).
    - Un hook personalizado.
    - Un archivo separado que llama modelos y actualiza la vista.

🛠 Ejemplos:

```jsx
jsx
CopiarEditar
// controllers/PolicyController.jsx
import { useEffect, useState } from 'react';
import { fetchPolicies } from '../models/PolicyModel';
import PolicyList from '../views/PolicyListView';

export default function PolicyController() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies().then(setPolicies);
  }, []);

  return <PolicyList policies={policies} />;
}

```

---

## 📁 Estructura de carpetas sugerida (MVC React)

```
cpp
CopiarEditar
/src
 ├── models/              // Lógica de negocio y acceso a datos
 │    └── PolicyModel.js
 ├── views/               // Componentes visuales
 │    └── PolicyListView.jsx
 ├── controllers/         // Coordinadores lógicos
 │    └── PolicyController.jsx
 ├── App.jsx
 └── index.js

```

---

Ejemplo basico de como distribuir un programa React en estructura MVC:

```jsx
// Estructura MVC básica para una app de seguros en React

// ==========================
// /src/models/PolicyModel.js
// ==========================

export async function fetchPolicies() {
  const response = await fetch("/api/policies");
  if (!response.ok) throw new Error("Error al obtener pólizas");
  return await response.json();
}

export async function createPolicy(policy) {
  const response = await fetch("/api/policies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(policy),
  });
  if (!response.ok) throw new Error("Error al crear póliza");
  return await response.json();
}

// ================================
// /src/views/PolicyListView.jsx
// ================================

import React from "react";

export default function PolicyListView({ policies }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Lista de pólizas</h2>
      <ul className="space-y-2">
        {policies.map((p) => (
          <li key={p.id} className="bg-gray-100 p-2 rounded">
            <strong>{p.title}</strong>: {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===================================
// /src/controllers/PolicyController.jsx
// ===================================

import React, { useEffect, useState } from "react";
import { fetchPolicies } from "../models/PolicyModel";
import PolicyListView from "../views/PolicyListView";

export default function PolicyController() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies()
      .then(setPolicies)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  return <PolicyListView policies={policies} />;
}

// =====================
// /src/App.jsx
// =====================

import React from "react";
import PolicyController from "./controllers/PolicyController";

export default function App() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Sistema de Seguros</h1>
      <PolicyController />
    </div>
  );
}

// =====================
// /src/index.js
// =====================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tu CSS base o Tailwind

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```