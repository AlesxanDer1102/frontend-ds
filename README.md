# Frontend — Registro de Incidencias

Interfaz web construida con **Next.js + React + TypeScript + Tailwind CSS**.
Consume la API del backend (FastAPI) para registrar, consultar y dar
seguimiento a incidencias en la vía pública.

## Requisitos

- Node.js 18+
- Backend en ejecución (carpeta `backend-ds`, por defecto en `http://localhost:8000`)

## Cómo correrlo

```powershell
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

 Para el flujo completo, el backend debe estar corriendo. Ver `backend-ds/README.md`.

## Rutas

| Ruta                 | Descripción                                     |
|----------------------|-------------------------------------------------|
| `/`                  | Listado de incidencias.                         |
| `/reportar`          | Formulario para registrar una incidencia.       |
| `/incidencias/[id]`  | Detalle de una incidencia y cambio de estado.   |

## Estructura

```
frontend-ds/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout con navegación
│   │   ├── page.tsx                # Listado de incidencias
│   │   ├── reportar/page.tsx       # Formulario de reporte
│   │   └── incidencias/[id]/page.tsx  # Detalle de una incidencia
│   ├── components/
│   │   ├── FormularioReporte.tsx   # Formulario con imagen y vista previa
│   │   ├── TarjetaIncidencia.tsx   # Tarjeta del listado
│   │   ├── EstadoBadge.tsx         # Insignia de estado
│   │   └── PanelEstado.tsx         # Panel de cambio de estado
│   └── lib/
│       ├── api.ts                  # Cliente HTTP de la API
│       ├── types.ts                # Tipos e etiquetas
│       └── workflow.ts             # Transiciones de estado válidas
├── EVIDENCIAS.md                   # Evidencias de los casos de uso
└── .env.local                      # Variable NEXT_PUBLIC_API_URL
```
