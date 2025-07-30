# Ejemplos de Código - Redirección de Nuevos Usuarios

Este archivo contiene ejemplos específicos de código para la implementación de la funcionalidad de redirección automática para nuevos usuarios.

## 📂 Estructura de Archivos Implementados

```
src/
├── controllers/
│   ├── ControladorIndex.tsx              # ✅ Implementado
│   ├── ControladorBienvenida.tsx         # ✅ Implementado
│   └── controllerHooks/
│       ├── useFirstTimeUser.ts           # ✅ Legacy (para referencia)
│       └── useAuthRedirect.ts            # ✅ Legacy (para referencia)
├── views/
│   ├── pages/
│   │   └── WelcomePage.tsx              # ✅ Implementado
│   └── components/
│       ├── NavBar/AuthUser.tsx          # ✅ Modificado
│       └── WelcomeTestControls.tsx      # ✅ Implementado
├── main.tsx                             # ✅ Modificado
├── App.tsx                              # ✅ Modificado
└── index.html                           # ✅ Modificado
```

## 🔧 Código Completo de Implementación

### 1. Lógica Principal - ControladorIndex.tsx

```tsx
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ControladorIndex = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Evitar ejecución durante carga o si no está autenticado
    if (isLoading || !isAuthenticated || !user) return;

    // Detectar si acabamos de venir de Auth0
    const urlParams = new URLSearchParams(location.search);
    const hasAuthParams = urlParams.has('code') && urlParams.has('state');
    
    if (hasAuthParams) {
      // Paso 1: Limpiar la URL de parámetros de Auth0
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Paso 2: Verificar qué acción realizó el usuario
      const authAction = localStorage.getItem("auth_action");
      const userKey = `user_welcomed_${user.sub}`;
      const hasBeenWelcomed = localStorage.getItem(userKey);
      
      console.log('🔍 Debug Info:', {
        authAction,
        hasBeenWelcomed,
        userSub: user.sub,
        shouldRedirect: authAction === "signup" || !hasBeenWelcomed
      });
      
      // Paso 3: Decidir si redirigir a bienvenida
      if (authAction === "signup" || !hasBeenWelcomed) {
        // Marcar como bienvenido para futuras visitas
        localStorage.setItem(userKey, "true");
        // Limpiar la acción temporal
        localStorage.removeItem("auth_action");
        
        console.log('🎉 Redirecting to welcome page...');
        
        // Pequeño delay para asegurar que el estado se estabilice
        setTimeout(() => {
          navigate("/bienvenida", { replace: true });
        }, 100);
      } else {
        // Usuario existente haciendo login - solo limpiar
        localStorage.removeItem("auth_action");
        console.log('👤 Existing user login - staying on home');
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, location]);

  // Estado de carga
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomePage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorIndex;
```

### 2. Controlador de Bienvenida - ControladorBienvenida.tsx

```tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import WelcomePage from "../views/pages/WelcomePage";

const ControladorBienvenida = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al home
  if (!isAuthenticated) {
    console.log('❌ No authenticated - redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Mostrar página de bienvenida
  console.log('✅ Showing welcome page');
  return <WelcomePage />;
};

export default ControladorBienvenida;
```

### 3. Página de Bienvenida - WelcomePage.tsx

```tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import GrayButton from "../components/GeneralComponents/Button";

const WelcomePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('🚗 User chose to start quotation');
    navigate("/solicitar-cotizacion");
  };

  const handleGoToProfile = () => {
    console.log('👤 User chose to complete profile');
    navigate("/perfil");
  };

  const handleSkipForNow = () => {
    console.log('⏭️ User chose to skip welcome');
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar isAuth={isAuthenticated} />
      <TitleSection title="¡Bienvenido a Car-Chain!" />
      
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                {/* Header con foto y saludo */}
                <div className="mb-4">
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt="Perfil"
                      className="rounded-circle mb-3 border border-3 border-primary"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  )}
                  <h1 className="h2 mb-3 text-primary">
                    ¡Hola {user?.given_name || user?.name || 'Usuario'}!
                  </h1>
                  <p className="lead text-muted mb-4">
                    Te damos la bienvenida a <strong>Car-Chain</strong>, tu plataforma de confianza 
                    para cotizar y contratar seguros de vehículos de manera rápida y segura.
                  </p>
                </div>

                {/* Características principales */}
                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="text-center h-100">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "70px", height: "70px" }}>
                        <i className="fas fa-car" style={{ fontSize: "28px" }}></i>
                      </div>
                      <h5 className="mb-3">Cotiza tu seguro</h5>
                      <p className="text-muted small">
                        Obtén cotizaciones personalizadas para tu vehículo en minutos
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="text-center h-100">
                      <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "70px", height: "70px" }}>
                        <i className="fas fa-shield-alt" style={{ fontSize: "28px" }}></i>
                      </div>
                      <h5 className="mb-3">Múltiples coberturas</h5>
                      <p className="text-muted small">
                        Elige entre diferentes opciones de cobertura adaptadas a tus necesidades
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="text-center h-100">
                      <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "70px", height: "70px" }}>
                        <i className="fas fa-user-cog" style={{ fontSize: "28px" }}></i>
                      </div>
                      <h5 className="mb-3">Gestiona tu perfil</h5>
                      <p className="text-muted small">
                        Administra tus datos, pólizas y cotizaciones desde tu perfil personal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="alert alert-light border border-primary" role="alert">
                  <i className="fas fa-info-circle text-primary me-2"></i>
                  <strong>¿Qué quieres hacer primero?</strong>
                  <br />
                  <small className="text-muted">
                    Puedes comenzar cotizando un seguro para tu vehículo o completar tu información personal.
                  </small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-4">
                  <div style={{ minWidth: "220px" }}>
                    <button 
                      className="btn btn-primary btn-lg w-100"
                      onClick={handleGetStarted}
                    >
                      <i className="fas fa-calculator me-2"></i>
                      Comenzar Cotización
                    </button>
                  </div>
                  <div style={{ minWidth: "220px" }}>
                    <button 
                      className="btn btn-outline-primary btn-lg w-100"
                      onClick={handleGoToProfile}
                    >
                      <i className="fas fa-user-edit me-2"></i>
                      Completar Perfil
                    </button>
                  </div>
                </div>

                {/* Opción de saltar */}
                <div>
                  <button 
                    className="btn btn-link text-muted"
                    onClick={handleSkipForNow}
                  >
                    <small>Saltar por ahora</small>
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-top">
                  <small className="text-muted">
                    <i className="fas fa-question-circle me-1"></i>
                    ¿Necesitas ayuda? Contacta nuestro soporte o revisa nuestras 
                    <a href="#" className="text-decoration-none"> preguntas frecuentes</a>.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
```

### 4. Botones de Autenticación - AuthUser.tsx

```tsx
import { useAuth0 } from "@auth0/auth0-react";

const AuthUser = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    console.log('🔑 User clicked login');
    // Marcar en localStorage que es un login (no registro)
    localStorage.setItem("auth_action", "login");
    
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login"
      }
    });
  };

  const handleSignUp = () => {
    console.log('📝 User clicked signup');
    // Marcar en localStorage que es un registro
    localStorage.setItem("auth_action", "signup");
    
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup"
      }
    });
  };

  return (
    <div className="navbar-nav ms-auto">
      <button
        type="button"
        className="btn btn-link px-3 me-2 text-decoration-none"
        style={{ color: "white" }}
        onClick={handleLogin}
      >
        <i className="fas fa-sign-in-alt me-1"></i>
        Iniciar Sesión
      </button>
      <button
        type="button"
        className="btn btn-primary me-3"
        style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
        onClick={handleSignUp}
      >
        <i className="fas fa-user-plus me-1"></i>
        Registrarse
      </button>
    </div>
  );
};

export default AuthUser;
```

### 5. Herramientas de Testing - WelcomeTestControls.tsx

```tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const WelcomeTestControls = () => {
  const { user } = useAuth0();
  const [isMinimized, setIsMinimized] = useState(false);

  const clearWelcomeStatus = () => {
    if (user?.sub) {
      const userKey = `user_welcomed_${user.sub}`;
      localStorage.removeItem(userKey);
      localStorage.removeItem("auth_action");
      
      console.log('🧹 Welcome status cleared for user:', user.sub);
      alert("✅ Estado de bienvenida limpiado.\nEl próximo login mostrará la página de bienvenida.");
    } else {
      alert("❌ No hay usuario autenticado");
    }
  };

  const checkWelcomeStatus = () => {
    if (user?.sub) {
      const userKey = `user_welcomed_${user.sub}`;
      const hasBeenWelcomed = localStorage.getItem(userKey);
      const authAction = localStorage.getItem("auth_action");
      
      const info = [
        `👤 Usuario: ${user.sub}`,
        `🎉 Bienvenido antes: ${hasBeenWelcomed ? "Sí" : "No"}`,
        `🎯 Última acción: ${authAction || "Ninguna"}`,
        `📧 Email: ${user.email || "No disponible"}`,
        `📅 Creado: ${user.created_at || "No disponible"}`
      ].join('\n');
      
      console.log('🔍 Welcome Status:', { userKey, hasBeenWelcomed, authAction, user });
      alert(info);
    } else {
      alert("❌ No hay usuario autenticado");
    }
  };

  const simulateNewUser = () => {
    localStorage.setItem("auth_action", "signup");
    console.log('🆕 Simulated new user signup action');
    alert("✅ Simulado registro de usuario nuevo.\nRecarga la página para ver la redirección.");
  };

  const simulateExistingUser = () => {
    localStorage.setItem("auth_action", "login");
    if (user?.sub) {
      localStorage.setItem(`user_welcomed_${user.sub}`, "true");
    }
    console.log('👤 Simulated existing user login');
    alert("✅ Simulado login de usuario existente.\nRecarga la página para ver el comportamiento.");
  };

  if (isMinimized) {
    return (
      <div style={{ 
        position: "fixed", 
        bottom: "20px", 
        right: "20px", 
        background: "#212529", 
        color: "white",
        padding: "8px 12px", 
        borderRadius: "20px",
        fontSize: "12px",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }} onClick={() => setIsMinimized(false)}>
        <i className="fas fa-tools"></i> Dev Tools
      </div>
    );
  }

  return (
    <div style={{ 
      position: "fixed", 
      bottom: "20px", 
      right: "20px", 
      background: "#f8f9fa", 
      padding: "15px", 
      border: "2px solid #dee2e6",
      borderRadius: "10px",
      fontSize: "12px",
      minWidth: "300px",
      zIndex: 9999,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          <i className="fas fa-tools me-1"></i>
          Dev Testing Controls
        </h6>
        <button 
          className="btn btn-sm btn-link p-0"
          onClick={() => setIsMinimized(true)}
          style={{ fontSize: "10px" }}
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
      
      <div className="row g-2">
        <div className="col-6">
          <button 
            className="btn btn-sm btn-warning w-100" 
            onClick={clearWelcomeStatus}
            title="Limpia el estado y simula usuario completamente nuevo"
          >
            <i className="fas fa-broom me-1"></i>
            Limpiar Estado
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-sm btn-info w-100" 
            onClick={checkWelcomeStatus}
            title="Muestra información actual del estado del usuario"
          >
            <i className="fas fa-search me-1"></i>
            Ver Estado
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-sm btn-success w-100" 
            onClick={simulateNewUser}
            title="Simula acción de registro de nuevo usuario"
          >
            <i className="fas fa-user-plus me-1"></i>
            Simular Nuevo
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-sm btn-secondary w-100" 
            onClick={simulateExistingUser}
            title="Simula acción de login de usuario existente"
          >
            <i className="fas fa-user me-1"></i>
            Simular Existente
          </button>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-top">
        <small className="text-muted">
          <i className="fas fa-lightbulb me-1"></i>
          Usuario actual: {user?.email || "No autenticado"}
        </small>
      </div>
    </div>
  );
};

export default WelcomeTestControls;
```

### 6. Configuración Principal - App.tsx

```tsx
import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ControladorBienvenida from "./controllers/ControladorBienvenida.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";
import WelcomeTestControls from "./views/components/WelcomeTestControls.tsx";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <div>
      <Routes>
        {/* Ruta de bienvenida protegida */}
        <Route path="/bienvenida" element={
          <ProtectedRoute>
            <ControladorBienvenida />
          </ProtectedRoute>
        } />
        
        {/* Rutas existentes */}
        <Route path="/solicitar-cotizacion" element={<ControladorSolicitarCotizacionDePoliza />} />
        <Route path="/" element={<ControladorIndex />} />
        
        {/* Ruta de perfil protegida */}
        <Route path="/perfil" element={
          <ProtectedRoute>
            <ControladorPerfil />
          </ProtectedRoute>
        } />
      </Routes>
      
      {/* Controles de testing solo en desarrollo y si está autenticado */}
      {import.meta.env.DEV && isAuthenticated && <WelcomeTestControls />}
    </div>
  );
}

export default App;
```

### 7. Configuración Auth0 - main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Auth0Provider } from "@auth0/auth0-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.tsx";

// Debug para verificar variables de entorno
console.log('🔑 Auth0 Domain:', import.meta.env.VITE_AUTH0_DOMAIN);
console.log('🔑 Auth0 Client ID:', import.meta.env.VITE_AUTH0_CLIENT_ID);

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Validación de variables de entorno
if (!domain || !clientID) {
  console.error('❌ Missing Auth0 environment variables');
  throw new Error('Auth0 domain and client ID are required');
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
```

## 🧪 Scripts de Testing

### Comandos para Consola del Navegador

```javascript
// === TESTING MANUAL ===

// Limpiar todo el estado
localStorage.clear();
console.log('✅ All localStorage cleared');

// Simular usuario nuevo (signup)
localStorage.setItem('auth_action', 'signup');
console.log('✅ Simulated signup action');

// Simular usuario existente (login)
localStorage.setItem('auth_action', 'login');
localStorage.setItem('user_welcomed_auth0|123456789', 'true');
console.log('✅ Simulated existing user login');

// Verificar estado actual
console.log('Current state:', {
  authAction: localStorage.getItem('auth_action'),
  userWelcomed: Object.keys(localStorage).filter(key => key.startsWith('user_welcomed_'))
});

// Forzar redirección (agregar parámetros Auth0 ficticios)
window.location.href = '/?code=test&state=test';
```

### Función de Debug Completa

```javascript
// === FUNCIÓN DE DEBUG COMPLETA ===
function debugWelcomeSystem() {
  const authAction = localStorage.getItem('auth_action');
  const allKeys = Object.keys(localStorage);
  const welcomeKeys = allKeys.filter(key => key.startsWith('user_welcomed_'));
  
  console.group('🔍 Welcome System Debug');
  console.log('📋 Current URL:', window.location.href);
  console.log('🎯 Auth Action:', authAction);
  console.log('👥 Welcome Keys:', welcomeKeys);
  console.log('🗂️ All localStorage:', localStorage);
  console.log('🌐 URL Params:', new URLSearchParams(window.location.search));
  console.groupEnd();
  
  return {
    authAction,
    welcomeKeys,
    hasAuthParams: new URLSearchParams(window.location.search).has('code'),
    currentPath: window.location.pathname
  };
}

// Ejecutar debug
debugWelcomeSystem();
```

## 📝 Variables de Entorno Requeridas

```env
# .env.local (desarrollo)
VITE_AUTH0_DOMAIN=tu-dominio.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id_aqui

# .env.production (producción)
VITE_AUTH0_DOMAIN=tu-dominio.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id_produccion
```

## 🚀 Comandos de Build y Deploy

```bash
# Desarrollo
npm run dev
# o
yarn dev

# Build para producción
npm run build
# o
yarn build

# Preview del build
npm run preview
# o
yarn preview
```

---

Esta documentación de código proporciona todos los ejemplos necesarios para implementar y mantener la funcionalidad de redirección para nuevos usuarios. Cada archivo incluye comentarios detallados y logs de debug para facilitar el desarrollo y troubleshooting.
