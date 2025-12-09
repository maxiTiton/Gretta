/**
 * App Component
 * Componente raíz de la aplicación
 */

import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import router from './router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a2332',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#e6a6b8',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App
