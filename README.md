# Movie Explorer App

Aplicación React + TypeScript creada con Vite.

## Requisitos
- Node.js 18+ y npm instalados.
- Ubícate en `movie-explorer-app` para correr los comandos.

## Configurar variables de entorno
1. Copia el archivo `.env.example` a `.env`.
2. Agrega tu API Key de OMDB a `VITE_OMDB_API_KEY`.
3. No compartas el `.env` ni subas el valor real a git.

## Instalación
```bash
npm install
```

## Desarrollo local
```bash
npm run dev
```
La terminal mostrará la URL local (por defecto `http://localhost:5173`); ábrela en tu navegador.

## Build de producción
```bash
npm run build
```
Genera los archivos listos para producción en `dist/`.

## Vista previa del build
```bash
npm run preview
```
Sirve el contenido de `dist/` para verificar el build final.

## Linting
```bash
npm run lint
```
Ejecuta ESLint sobre el proyecto.
