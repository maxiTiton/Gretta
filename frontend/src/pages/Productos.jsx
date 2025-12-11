import { useState, useMemo, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import SearchBar from '@/components/productos/SearchBar'
import CategoryFilter from '@/components/productos/CategoryFilter'
import ProductGrid from '@/components/productos/ProductGrid'
import { useDebounce } from '@/hooks/useDebounce'
import { getProductos, getCategorias } from '@/services/productos.service'
import { clsx } from 'clsx'

/**
 * Productos Page
 * Catálogo completo con filtros, búsqueda y ordenamiento
 * Conectado con Supabase
 */
export default function Productos() {
  // Estados
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [sortBy, setSortBy] = useState('destacados') // destacados, precio-asc, precio-desc, nombre
  const [loading, setLoading] = useState(true)
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  
  // Debounce del search
  const debouncedSearch = useDebounce(searchQuery, 300)
  
  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos()
  }, [])
  
  /**
   * Cargar productos y categorías desde Supabase
   */
  const cargarDatos = async () => {
    setLoading(true)
    
    try {
      // Cargar productos disponibles
      const { data: productosData, error: productosError } = await getProductos({ 
        disponible: true 
      })
      
      if (productosError) {
        console.error('Error al cargar productos:', productosError)
      } else if (productosData) {
        console.log('✅ Productos cargados:', productosData.length)
        setProductos(productosData)
      }
      
      // Cargar categorías activas
      const { data: categoriasData, error: categoriasError } = await getCategorias()
      
      if (categoriasError) {
        console.error('Error al cargar categorías:', categoriasError)
      } else if (categoriasData) {
        console.log('✅ Categorías cargadas:', categoriasData.length)
        
        // Calcular conteo de productos por categoría
        const categoriasConConteo = categoriasData.map(cat => ({
          ...cat,
          count: productosData?.filter(p => p.categoria?.nombre === cat.nombre).length || 0
        }))
        
        // Agregar opción "Todos"
        setCategorias([
          { id: 'todos', nombre: 'Todos', count: productosData?.length || 0 },
          ...categoriasConConteo
        ])
      }
    } catch (error) {
      console.error('Error al cargar datos:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...productos]
    
    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => 
        p.categoria?.nombre?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.categoria?.id === selectedCategory
      )
    }
    
    // Filtrar por búsqueda (nombre y descripción)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(query))
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
          if (a.mas_vendido && !b.mas_vendido) return -1
          if (!a.mas_vendido && b.mas_vendido) return 1
          return 0
        })
        break
    }
    
    return filtered
  }, [productos, debouncedSearch, selectedCategory, sortBy])
  
  // Handlers
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
        categories={categorias}
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
          onViewDetail={handleViewDetail}
          loading={loading}
        />
      </div>
    </div>
  )
}
