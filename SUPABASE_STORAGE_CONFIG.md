# Configuración de Supabase Storage para Imágenes de Productos

## Configuración Requerida

### 1. Crear Bucket de Storage

1. Ir a tu dashboard de Supabase
2. Navegar a **Storage** en el menú lateral
3. Hacer clic en **New Bucket**
4. Configurar el bucket:
   - **Name**: `imagenes`
   - **Public**: ✅ Activar (para URLs públicas)
5. Hacer clic en **Create Bucket**

### 2. Configurar Políticas de Seguridad (RLS Policies)

Debes configurar las políticas de acceso para el bucket `imagenes`.

#### Política de Lectura Pública

Permite que cualquier usuario pueda ver las imágenes:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'imagenes' );
```

#### Política de Subida Autenticada

Permite que usuarios autenticados puedan subir imágenes:

```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'imagenes' );
```

#### Política de Actualización Autenticada

Permite que usuarios autenticados puedan actualizar imágenes:

```sql
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'imagenes' );
```

#### Política de Eliminación Autenticada

Permite que usuarios autenticados puedan eliminar imágenes:

```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'imagenes' );
```

### 3. Aplicar las Políticas

1. En Supabase Dashboard, ir a **Storage**
2. Seleccionar el bucket `imagenes`
3. Hacer clic en **Policies**
4. Hacer clic en **New Policy**
5. Copiar y pegar cada política SQL
6. Hacer clic en **Review** y luego **Save Policy**

### 4. Verificar Configuración

Para verificar que todo funciona correctamente:

1. Ir al panel admin: `/admin/productos`
2. Hacer clic en "Nuevo Producto"
3. Intentar subir una imagen de prueba
4. Si la imagen se sube correctamente, la configuración está bien

## Estructura de Archivos

Las imágenes se guardarán en la siguiente estructura:

```
imagenes/
  productos/
    {productoId}-{timestamp}.{extension}
```

Ejemplo:
- `imagenes/productos/123-1702584000000.jpg`

## Notas Importantes

- **Tamaño máximo**: 5MB por imagen
- **Formatos soportados**: PNG, JPG, JPEG, GIF, WebP
- **Nombres únicos**: Se genera automáticamente usando ID + timestamp
- **Cache**: Las imágenes tienen cache de 1 hora (3600 segundos)

## Troubleshooting

### Error: "new row violates row-level security policy"

Verifica que las políticas RLS estén correctamente configuradas y que el usuario esté autenticado.

### Error: "Bucket not found"

Asegúrate de que el bucket se llama exactamente `imagenes` (sin tildes ni mayúsculas).

### Las imágenes no se ven

1. Verifica que el bucket sea público
2. Verifica la política de lectura pública
3. Revisa las URLs generadas en la consola del navegador

## Alternativa: Desactivar RLS (Solo para desarrollo)

⚠️ **NO RECOMENDADO PARA PRODUCCIÓN**

Si quieres desactivar RLS temporalmente para testing:

1. Ir a **Storage** → Bucket `imagenes` → **Policies**
2. Hacer clic en **Disable RLS**

Recuerda activarlo nuevamente antes de ir a producción.
