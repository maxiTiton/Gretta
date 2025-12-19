# 🍰 Gretta - Sistema de Pedidos Online

Sistema web completo para gestión de pedidos online de **Gretta**, cafetería, heladería y pastelería de autor.

## 📚 Documentación Adicional

- 🛒 [Carrito de Compras](./CARRITO_README.md) - Implementación y funcionalidades del carrito
- 👨‍💼 [Panel Administrativo](./ADMIN_README.md) - Guía del panel admin
- 🎁 [Promociones](./IMPLEMENTACION_PROMOS_CONFIG.md) - Sistema de promociones y configuración
- 📦 [Productos con Imágenes](./IMPLEMENTACION_PRODUCTOS_IMAGENES.md) - Cómo agregar productos con fotos
- 🚀 [Guía Rápida Productos](./GUIA_RAPIDA_PRODUCTOS.md) - Pasos rápidos para cargar productos
- 📸 [Guía de Imágenes](./PRODUCTOS_IMAGENES_GUIA.md) - Tutorial detallado de carga de imágenes
- ☁️ [Supabase Storage](./SUPABASE_STORAGE_CONFIG.md) - Configuración de almacenamiento de imágenes

## 🌟 Características

### Para Clientes
- 🛍️ **Catálogo completo** de productos (café, helados, pastelería)
- 🛒 **Carrito de compras** con persistencia
- 💳 **Pagos online** con MercadoPago
- 🚚 **Delivery o retiro** en local
- 🎁 **Promociones** y descuentos especiales
- 🎂 **Pedidos personalizados** para cumpleaños
- 📱 **Diseño responsive** mobile-first

### Para Administradores
- 📦 **Gestión de pedidos** en tiempo real
- 📝 **CRUD de productos** con carga de imágenes
- 🏷️ **Gestión de categorías** y promociones
- 📊 **Dashboard** con estadísticas
- 🔔 **Notificaciones** de nuevos pedidos
- ⚙️ **Configuración** del local (horarios, delivery, etc)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **Vite**
- **TailwindCSS** - Estilos
- **React Router v6** - Navegación
- **Zustand** - State management
- **React Hook Form** + **Zod** - Formularios y validación

### Backend
- **Node.js 18+**
- **Supabase** (Backend as a Service)
  - **PostgreSQL** - Base de datos
  - REST API automática
  - Autenticación
  - Storage de imágenes
  - Realtime

### Servicios Externos
- **MercadoPago API** - Procesamiento de pagos
- **Cloudinary** - CDN de imágenes
- **Vercel** - Hosting

## 📱 Secciones de la Aplicación

### Públicas
- **Home** - Landing page con productos destacados
- **Productos** - Catálogo completo con filtros por categoría
- **Beneficios** - Programa de beneficios y ofertas
- **Info** - Ubicación, contacto y horarios
- **Promos** - Promociones vigentes
- **Tu Cumple** - Pedidos especiales para cumpleaños
- **Carrito** - Resumen de compra
- **Checkout** - Proceso de pago

### Administración (Protegidas)
- **Login** - Autenticación de administradores
- **Dashboard** - Panel principal con métricas
- **Gestión de Productos** - CRUD completo
- **Gestión de Pedidos** - Visualización y cambio de estados
- **Gestión de Promociones** - Ofertas y descuentos
- **Configuración** - Ajustes del local

## 🎨 Paleta de Colores
```css
--gretta-navy: #1a2332        /* Azul oscuro principal */
--gretta-blue: #2d4a6f        /* Azul medio */
--gretta-pink: #e6a6b8        /* Rosa acento */
--gretta-cream: #f5f5f5       /* Crema fondo */
--gretta-green-pastel: #b8d4c8  /* Verde pastel */
--gretta-pink-pastel: #f5ccd4   /* Rosa pastel */
```

## 🗄️ Base de Datos

### Tablas Principales
- `categorias` - Categorías de productos
- `productos` - Catálogo completo
- `pedidos` - Órdenes de clientes
- `items_pedido` - Detalle de productos por pedido
- `promociones` - Ofertas activas
- `usuarios_admin` - Administradores del sistema
- `configuracion` - Configuración del local

## 📦 Estados de Pedidos
```
Pendiente → Confirmado → Preparando → Listo → Entregado
                                   ↓
                              Cancelado
```

## 👥 Equipo de Desarrollo

- **[@maxiTiton](https://github.com/maxiTiton)** - Full Stack Developer
- **[@alejoalf](https://github.com/alejoalf)** - Full Stack Developer

## 🔗 Enlaces

- Instagram: [@grettago_](https://www.instagram.com/grettago_/)
- Demo: [Próximamente]

## 📄 Licencia

Proyecto privado desarrollado para **Gretta** - Cafetería, heladería y pastelería de autor.

---

⭐️ Hecho con amor y mucho café ☕
