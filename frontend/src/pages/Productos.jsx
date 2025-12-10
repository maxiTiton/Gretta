import { useState, useMemo } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import SearchBar from '@/components/productos/SearchBar'
import CategoryFilter from '@/components/productos/CategoryFilter'
import ProductGrid from '@/components/productos/ProductGrid'
import { useDebounce } from '@/hooks/useDebounce'
import { clsx } from 'clsx'

/**
 * Productos Page
 * Catálogo completo con filtros, búsqueda y ordenamiento
 */
export default function Productos() {
  // Estados
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [sortBy, setSortBy] = useState('destacados') // destacados, precio-asc, precio-desc, nombre
  const [loading, setLoading] = useState(false)
  
  // Debounce del search
  const debouncedSearch = useDebounce(searchQuery, 300)
  
  // Data: 24 productos reales de Gretta (menú oficial)
  const allProducts = [
    // ESPECIALES (3)
    { id: 1, nombre: "Mini Almendras", descripcion: "5 unidades", precio: 6000, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Mini+Almendras", categoria: "especiales", disponible: true, masVendido: false },
    { id: 2, nombre: "Palmeritas Mini", descripcion: "100 grs", precio: 3900, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Palmeritas+Mini", categoria: "especiales", disponible: true, masVendido: false },
    { id: 3, nombre: "Palmeritas Max", descripcion: "250 grs", precio: 8450, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Palmeritas+Max", categoria: "especiales", disponible: true, masVendido: false },
    
    // HELADERÍA (5)
    { id: 4, nombre: "Helado 1/4 kg", descripcion: "2 sabores", precio: 9100, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Helado+1%2F4+kg", categoria: "heladeria", disponible: true, masVendido: true },
    { id: 5, nombre: "Helado 1/2 kg", descripcion: "3 sabores", precio: 12740, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Helado+1%2F2+kg", categoria: "heladeria", disponible: true, masVendido: true },
    { id: 6, nombre: "Helado 1 kg", descripcion: "4 sabores", precio: 24050, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Helado+1+kg", categoria: "heladeria", disponible: true, masVendido: true },
    { id: 7, nombre: "Paleta Premium", descripcion: "Paleta helada premium con cobertura", precio: 6890, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Paleta+Premium", categoria: "heladeria", disponible: true, masVendido: true },
    { id: 8, nombre: "Paleta Tradicional", descripcion: "Paleta helada tradicional", precio: 5460, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Paleta+Tradicional", categoria: "heladeria", disponible: true, masVendido: true },
    
    // LAMINADOS (2)
    { id: 9, nombre: "Croissant", descripcion: "1 unidad", precio: 2800, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Croissant", categoria: "laminados", disponible: true, masVendido: false },
    { id: 10, nombre: "Pan de Chocolate", descripcion: "1 unidad", precio: 4900, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Pan+Chocolate", categoria: "laminados", disponible: true, masVendido: true },
    
    // MINI TARTAS - Pastelería (5)
    { id: 11, nombre: "Mini Lemon Pie", descripcion: "Mini tarta de limón con merengue", precio: 10660, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Mini+Lemon+Pie", categoria: "pasteleria", disponible: true, masVendido: false },
    { id: 12, nombre: "Mini Manzana", descripcion: "Mini tarta de manzana", precio: 13130, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Mini+Manzana", categoria: "pasteleria", disponible: true, masVendido: false },
    { id: 13, nombre: "Mini Bandiera", descripcion: "Mini tarta bandiera", precio: 16770, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Mini+Bandiera", categoria: "pasteleria", disponible: true, masVendido: false },
    { id: 14, nombre: "Mini Avellanas", descripcion: "Mini tarta de avellanas", precio: 13600, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Mini+Avellanas", categoria: "pasteleria", disponible: true, masVendido: false },
    { id: 15, nombre: "Mini Cheese Cake con frutos rojos", descripcion: "Mini cheesecake con frutos rojos", precio: 16900, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Mini+Cheese+Cake", categoria: "pasteleria", disponible: true, masVendido: false },
    
    // PANIFICACIÓN (3)
    { id: 16, nombre: "Chipá", descripcion: "100 grs", precio: 2600, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Chipa", categoria: "panificacion", disponible: true, masVendido: true },
    { id: 17, nombre: "Criollos", descripcion: "100 grs", precio: 1300, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Criollos", categoria: "panificacion", disponible: true, masVendido: true },
    { id: 18, nombre: "Medialuna Dulce", descripcion: "1 unidad", precio: 1573, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Medialuna+Dulce", categoria: "panificacion", disponible: true, masVendido: false },
    
    // TEAM DULCE (6)
    { id: 19, nombre: "Alfalargo Nuez", descripcion: "Cobertura blanca", precio: 5600, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Alfalargo+Nuez", categoria: "team-dulce", disponible: true, masVendido: false },
    { id: 20, nombre: "Alfalargo Maní", descripcion: "Cobertura semi amarga", precio: 5600, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Alfalargo+Mani", categoria: "team-dulce", disponible: true, masVendido: false },
    { id: 21, nombre: "Cookie Bretona Frambuesa", descripcion: "Cookie artesanal con frambuesa", precio: 4550, imagen_url: "https://placehold.co/600x450/e6a6b8/ffffff?text=Cookie+Frambuesa", categoria: "team-dulce", disponible: true, masVendido: false },
    { id: 22, nombre: "Cookie Dulce de Leche", descripcion: "Cookie rellena con dulce de leche", precio: 4550, imagen_url: "https://placehold.co/600x450/f5ccd4/1a2332?text=Cookie+DDL", categoria: "team-dulce", disponible: true, masVendido: false },
    { id: 23, nombre: "Cookie de Avena y Chocolate", descripcion: "Cookie saludable con avena y chips de chocolate", precio: 4550, imagen_url: "https://placehold.co/600x450/b8d4c8/1a2332?text=Cookie+Avena", categoria: "team-dulce", disponible: true, masVendido: false },
    { id: 24, nombre: "Cookie Pistacho, Frambuesa y Chocolate", descripcion: "Cookie gourmet con pistacho, frambuesa y chocolate", precio: 4550, imagen_url: "https://placehold.co/600x450/2d4a6f/ffffff?text=Cookie+Pistacho", categoria: "team-dulce", disponible: true, masVendido: false },
  ]
  
  // Calcular categorías con conteo
  const categories = useMemo(() => {
    const categoryCounts = allProducts.reduce((acc, product) => {
      acc[product.categoria] = (acc[product.categoria] || 0) + 1
      return acc
    }, {})
    
    return [
      { id: 'todos', nombre: 'Todos', count: allProducts.length },
      { id: 'heladeria', nombre: 'Heladería', count: categoryCounts.heladeria || 0 },
      { id: 'pasteleria', nombre: 'Pastelería', count: categoryCounts.pasteleria || 0 },
      { id: 'laminados', nombre: 'Laminados', count: categoryCounts.laminados || 0 },
      { id: 'panificacion', nombre: 'Panificación', count: categoryCounts.panificacion || 0 },
      { id: 'team-dulce', nombre: 'Team Dulce', count: categoryCounts['team-dulce'] || 0 },
      { id: 'especiales', nombre: 'Especiales', count: categoryCounts.especiales || 0 },
    ]
  }, [])
  
  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]
    
    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.categoria === selectedCategory)
    }
    
    // Filtrar por búsqueda (nombre y descripción)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
      )
    }
    
    // Ordenar
    switch (sortBy) {
      case 'precio-asc':
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case 'nombre':
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'destacados':
      default:
        // Priorizar más vendidos primero
        filtered.sort((a, b) => {
          if (a.masVendido && !b.masVendido) return -1
          if (!a.masVendido && b.masVendido) return 1
          return 0
        })
        break
    }
    
    return filtered
  }, [debouncedSearch, selectedCategory, sortBy])
  
  // Handlers
  const handleAddToCart = (producto) => {
    // TODO: Integrar con cartStore de Zustand
    console.log('Agregar al carrito:', producto)
    alert(`${producto.nombre} agregado al carrito`)
  }
  
  const handleViewDetail = (producto) => {
    // TODO: Navegar a detalle del producto o abrir modal
    console.log('Ver detalle:', producto)
  }
  
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white">Productos</span>
          </nav>
          <h1 className="text-4xl font-serif font-bold mb-2">Nuestros Productos</h1>
          <p className="text-lg text-gray-300">
            Descubrí nuestra variedad de productos artesanales
          </p>
        </div>
      </div>
      
      {/* Search y Filtros */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar productos..."
              className="w-full lg:w-auto"
            />
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 lg:flex-none px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent appearance-none bg-white pr-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      
      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-navy">{filteredProducts.length}</span> productos
            {debouncedSearch && (
              <span> para "{debouncedSearch}"</span>
            )}
          </p>
        </div>
        
        {/* Grid */}
        <ProductGrid
          productos={filteredProducts}
          onAddToCart={handleAddToCart}
          onViewDetail={handleViewDetail}
          loading={loading}
        />
      </div>
    </div>
  )
}
