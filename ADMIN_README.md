# Panel de Administración - Gretta

Panel completo para gestionar pedidos del e-commerce Gretta.

## 🎯 Funcionalidades

### Dashboard (`/admin`)
- **Stats en tiempo real:**
  - Pedidos pendientes
  - En preparación
  - Listos para entregar
  - Ventas totales del día
- **Últimos 10 pedidos** con navegación directa
- **Auto-refresh** cada 30 segundos

### Gestión de Pedidos (`/admin/pedidos`)
- **Filtros:**
  - Por estado (Todos, Pendiente, Preparando, Listo, Entregado, Cancelado)
  - Búsqueda por número de pedido, nombre o teléfono
- **Vista responsive:**
  - Tabla completa en desktop
  - Cards en mobile
- **Click en cualquier pedido** para ver detalle completo

### Detalle de Pedido (Modal)
- **Información completa:**
  - Datos del cliente (clickeables: tel, email)
  - Tipo de entrega y método de pago
  - Lista de productos con precios
  - Totales desglosados
  - Notas del cliente
- **Cambio de estado:**
  - Workflow: pendiente → preparando → listo → entregado
  - Confirmación para cancelar pedido
  - Actualización inmediata en la lista

## 🎨 Componentes Creados

### Componentes Admin
- `Sidebar.jsx` - Navegación lateral con menú
- `StatsCard.jsx` - Tarjetas de estadísticas
- `OrderStatusBadge.jsx` - Badge de estado con colores
- `OrderDetail.jsx` - Modal de detalle completo

### Páginas Admin
- `Dashboard.jsx` - Panel principal con stats
- `PedidosAdmin.jsx` - Gestión de pedidos

### Servicios
- `pedidos.service.js` - Nueva función `actualizarEstadoPedido()`

## 🚀 Acceso

### Desarrollo (Sin autenticación)
Simplemente navega a:
```
http://localhost:5173/admin
```

### Rutas disponibles:
- `/admin` - Dashboard principal
- `/admin/pedidos` - Gestión de pedidos
- `/admin/productos` - Próximamente
- `/admin/promociones` - Próximamente
- `/admin/configuracion` - Próximamente

## 🔧 Configuración

### Auto-refresh
Los pedidos se actualizan automáticamente cada 30 segundos en el Dashboard.

### Estados de pedido
1. **pendiente** (naranja) - Pedido nuevo
2. **preparando** (azul) - En cocina
3. **listo** (verde) - Listo para retirar/entregar
4. **entregado** (gris) - Completado
5. **cancelado** (rojo) - Cancelado

## 📱 Responsive

- **Desktop:** Sidebar fijo + tabla completa
- **Mobile:** Menu hamburguesa + cards

## 🎨 Paleta de Colores

- Navy: `#1a2332` - Headers y texto principal
- Blue: `#2d4a6f` - Acciones principales
- Pink: `#e6a6b8` - Acentos y badges admin
- Cream: `#f5f5f5` - Fondos

## 🔮 Próximas mejoras

- [ ] Autenticación con login
- [ ] Notificación sonora de pedidos nuevos
- [ ] Imprimir pedido
- [ ] Exportar pedidos a CSV
- [ ] WhatsApp directo al cliente
- [ ] Gestión de productos
- [ ] Gestión de promociones

## 📊 Base de Datos

### Tabla: `pedidos`
Requiere actualizar el campo `updated_at` automáticamente o manualmente al cambiar estados.

### Función de actualización:
```javascript
import { actualizarEstadoPedido } from '@/services/pedidos.service'

await actualizarEstadoPedido(pedidoId, 'preparando')
```

## 🐛 Debugging

Los servicios incluyen console.log para tracking:
- ✅ Operaciones exitosas
- ❌ Errores

Revisa la consola del navegador para más info.
