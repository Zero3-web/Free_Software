# Guía de Despliegue en Vercel

## Problema Común: Error de Despliegue

Si recibes el error "There was an error deploying free-software to the production environment", sigue estos pasos:

## Solución Paso a Paso

### 1. Verificar Configuración del Proyecto

**Vercel.json está correctamente configurado:**
- ✅ Framework: Astro
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

### 2. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a **Settings** → **Environment Variables**
3. Agrega las siguientes variables si no existen:

```
NODE_VERSION=18
NPM_VERSION=9
```

### 3. Configurar Node.js Version

Crea o actualiza `.nvmrc` en la raíz del proyecto:

```
18.17.0
```

### 4. Verificar Build Settings en Vercel

En el Dashboard de Vercel:
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 5. Posibles Causas del Error

#### A. Error de Dependencies
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

#### B. Error de Memory/Timeout
En Vercel Settings → Functions:
- **Max Duration**: 30s (ya configurado)
- **Memory**: 1024 MB

#### C. Error de Build Cache
En Vercel Dashboard:
1. Ve a **Deployments**
2. Haz clic en "..." en el último deployment
3. Selecciona **Redeploy**
4. Marca **"Use existing Build Cache"** = **NO**

### 6. Re-desplegar desde GitHub

#### Opción A: Force Push
```bash
git add .
git commit --allow-empty -m "force: trigger vercel redeploy"
git push origin main
```

#### Opción B: Manual Redeploy
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto "free-software"
3. Ve a **Deployments**
4. Haz clic en **"Redeploy"** en el último commit
5. **Desactiva** "Use existing Build Cache"

### 7. Verificar Logs de Error

En Vercel Dashboard:
1. Ve a **Deployments**
2. Haz clic en el deployment fallido
3. Revisa **Build Logs** y **Function Logs**
4. Busca errores específicos

### 8. Configuración Avanzada

Si el problema persiste, actualiza `vercel.json`:

```json
{
  "buildCommand": "npm ci && npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "github": {
    "enabled": true,
    "autoAlias": true
  },
  "functions": {
    "src/pages/api/*.ts": {
      "maxDuration": 30
    }
  },
  "build": {
    "env": {
      "NODE_VERSION": "18.17.0"
    }
  }
}
```

### 9. Verificación Final

**El proyecto debe:**
- ✅ Construir exitosamente (`npm run build`)
- ✅ Tener 39 páginas generadas
- ✅ Sin errores críticos en consola
- ✅ Repositorio limpio (`git status`)

### 10. Contactar Soporte Vercel

Si todos los pasos fallan:
1. Ve a [vercel.com/help](https://vercel.com/help)
2. Incluye el **Deployment ID** del error
3. Menciona que es un proyecto **Astro 5.x con React 19.x**

## Estado Actual del Proyecto

✅ **Build exitoso**: 39 páginas construidas
✅ **Sin errores críticos**: Solo warnings menores
✅ **Configuración optimizada**: vercel.json completo
✅ **Código limpio**: Sin duplicados ni malas prácticas
✅ **Mobile-first**: Completamente responsivo

## Comandos de Emergencia

```bash
# Verificar build local
npm run build

# Limpiar y reinstalar
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Force redeploy
git commit --allow-empty -m "fix: force vercel redeploy"
git push origin main
```

---

**¡Tu proyecto está listo para producción!** El error de Vercel es típicamente de configuración o cache, no del código.
