# 🛒 Sistema de Carrito de Compras - Gretta

Sistema completo de carrito de compras implementado con **Zustand** para state management global y **persistencia** en localStorage.

---

## 📦 Componentes Creados

### 1. **Store** (`src/store/cartStore.js`)
Store de Zustand con persistencia en localStorage.

**Estado:**
```javascript
{
  items: Array<{ producto, cantidad }>,
  isOpen: boolean
}
```

**Acciones:**
- `addItem(producto)` - Agrega producto o incrementa cantidad
- `removeItem(productoId)` - Elimina producto completamente
- `updateQuantity(productoId, cantidad)` - Actualiza cantidad (min: 1)
- `clearCart()` - Vacía el carrito
- `toggleCart()` / `openCart()` / `closeCart()` - Control del drawer
- `getTotal()` - Calcula total del carrito
- `getItemCount()` - Cuenta items totales

**Persistencia:**
- Key: `gretta-cart-storage`
- Se guarda automáticamente en localStorage al cambiar

---

### 2. **CartButton** (`src/components/carrito/CartButton.jsx`)
Botón del carrito en navbar con badge animado.

**Features:**
- Badge circular con cantidad de items
- Animación `bounce` cuando hay items
- Muestra "99+" si hay más de 99 items
- Click abre CartDrawer

**Integrado en:** `Navbar.jsx`

---

### 3. **CartDrawer** (`src/components/carrito/CartDrawer.jsx`)
Drawer lateral que se desliza desde la derecha.

**Features:**
- **Backdrop** oscuro con blur
- **Animación** slide-in suave
- **Responsive**: 90% mobile, 400px desktop
- **Cerrar con**: X, ESC key, click en backdrop
- **Empty state**: Mensaje + botón "Ver productos"
- **Progress bar**: Para envío gratis (+$5.000)
- **Footer sticky**: Subtotal + botón checkout

**Estructura:**
- Header: Título + badge + botón cerrar
- Body scrolleable: Lista de CartItem
- Footer: Subtotal + envío + checkout

---

### 4. **CartItem** (`src/components/carrito/CartItem.jsx`)
Item individual del carrito con controles.

**Features:**
- Layout horizontal: imagen (80x80) | info | controles
- **Controles de cantidad**: Botones +/- (min: 1)
- **Botón eliminar**: Icono trash (rojo)
- **Subtotal calculado**: precio × cantidad
- Responsive y accesible

---

### 5. **CartSummary** (`src/components/carrito/CartSummary.jsx`)
Resumen del pedido para página de carrito.

**Features:**
- Contador de productos
- Subtotal
- Cálculo de envío (gratis si >$5.000)
- Progress bar para envío gratis
- Total destacado
- Botón "Continuar con el pedido"
- **Sticky** en desktop (opcional)

---

### 6. **Página Carrito** (`src/pages/Carrito.jsx`)
Página completa del carrito.

**Layout:**
- **Header**: Breadcrumb + título
- **2 columnas** (desktop):
  - Izquierda (8/12): Lista de items + botón vaciar
  - Derecha (4/12): CartSummary sticky
- **Empty state**: Mensaje + botón "Ver productos"
- **Trust badges**: Pago seguro, envío rápido, productos artesanales

**Ruta:** `/carrito`

---

## 🔗 Integración

### En `Navbar.jsx`:
```jsx
import CartButton from '@/components/carrito/CartButton'
import CartDrawer from '@/components/carrito/CartDrawer'

// En el JSX:
<CartButton />
<CartDrawer />
```

### En `ProductCard.jsx`:
```jsx
import { useCartStore } from '@/store/cartStore'

const addItem = useCartStore(state => state.addItem)
const openCart = useCartStore(state => state.openCart)

const handleAddToCart = (e) => {
  e.stopPropagation()
  if (disponible) {
    addItem(producto)
    openCart() // Abre drawer automáticamente
  }
}
```

### En `router.jsx`:
```jsx
{
  path: 'carrito',
  element: <Carrito />,
}
```

---

## 🎨 Estilos y Animaciones

**Colores:**
- Navy: `#1a2332` (header drawer)
- Pink: `#e6a6b8` (badge, precios)
- Blue: `#2d4a6f` (botones, progress)
- Cream: `#f5f5f5` (fondo)

**Animaciones:**
- Badge: `animate-bounce` cuando hay items
- Drawer: `transition-transform duration-300`
- Progress bar: `transition-all duration-300`

---

## ✅ Características Implementadas

- ✅ **Persistencia** en localStorage
- ✅ **Drawer animado** con backdrop blur
- ✅ **Badge** con contador en navbar
- ✅ **Envío gratis** en compras >$5.000
- ✅ **Progress bar** para envío gratis
- ✅ **Empty states** bien diseñados
- ✅ **Responsive** completo
- ✅ **Accesibilidad** (aria-labels, ESC key)
- ✅ **Confirmación** antes de vaciar carrito
- ✅ **Auto-open** drawer al agregar producto

---

## 🚀 Próximos Pasos (Opcionales)

- [ ] Toast notifications al agregar/eliminar
- [ ] Animaciones con Framer Motion
- [ ] Límite de cantidad por producto
- [ ] Descuentos/cupones en CartSummary
- [ ] Integración con backend (Supabase)

---

## 📱 Uso del Store

```javascript
// En cualquier componente:
import { useCartStore } from '@/store/cartStore'

// Obtener datos:
const items = useCartStore(state => state.items)
const total = useCartStore(state => state.getTotal())
const itemCount = useCartStore(state => state.getItemCount())

// Ejecutar acciones:
const addItem = useCartStore(state => state.addItem)
const removeItem = useCartStore(state => state.removeItem)
const clearCart = useCartStore(state => state.clearCart)

// Usar:
addItem(producto)
removeItem(productoId)
clearCart()
```

---

**Desarrollado para:** Gretta - Cafetería, Heladería y Pastelería Artesanal  
**Stack:** React 18 + Zustand + TailwindCSS + Lucide Icons
