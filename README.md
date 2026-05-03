# 🍕 Food Store

Aplicación de ecommerce de comidas desarrollada como Trabajo Práctico Integrador para la materia **Programación III** de la Tecnicatura Universitaria en Programación (UTN).

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite

## 📁 Estructura del proyecto

```
src/
├── data/
│   └── data.ts               ← productos y categorías
├── pages/
│   ├── auth/
│   │   ├── login/            ← página de login
│   │   └── registro/         ← página de registro
│   ├── admin/
│   │   └── home/             ← home del administrador
│   ├── client/
│   │   └── home/             ← redirección al store
│   └── store/
│       ├── home/             ← catálogo de productos
│       └── cart/             ← carrito de compras
├── types/
│   ├── product.ts            ← interfaces Product y CartItem
│   ├── category.ts           ← interface ICategory
│   ├── IUser.ts              ← interface IUser
│   └── Rol.ts                ← type Rol
└── utils/
    ├── auth.ts               ← lógica de autenticación
    ├── cartLocalStorage.ts               ← lógica del carrito (localStorage)
    ├── localStorage.ts       ← manejo de usuarios en localStorage
    └── navigate.ts           ← función de navegación
```

## ▶️ Instrucciones para ejecutar

**Requisitos:** tener instalado [Node.js](https://nodejs.org) y [pnpm](https://pnpm.io).

```bash
# 1. Clonar el repositorio
git clone https://github.com/tomasAnch/FoodStore-TPI
cd FoodStore-TPI

# 2. Instalar dependencias
pnpm install

# 3. Levantar el servidor de desarrollo
pnpm dev
```

Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

## 🔐 Usuarios de prueba

Para probar la aplicación primero hay que registrarse desde la pantalla de registro. El rol asignado por defecto es **cliente**.

## ✅ Funcionalidades implementadas

- Registro e inicio de sesión con persistencia en localStorage
- Rutas protegidas por rol (admin / cliente)
- Catálogo de productos renderizado dinámicamente
- Búsqueda de productos por nombre en tiempo real
- Filtrado de productos por categoría
- Carrito de compras con persistencia en localStorage
- Agregar productos al carrito (sin duplicados, suma cantidad)
- Eliminar productos del carrito
- Cálculo automático del total de la compra
- Indicador visual de cantidad de items en el carrito
