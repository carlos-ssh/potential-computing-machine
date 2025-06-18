# InvoicesApp

Una aplicación web moderna y profesional para la gestión y consulta de facturas, construida con Angular y Angular Material.

## 🚀 Características
- Interfaz responsiva y elegante con Angular Material
- Filtros por rango de fechas y opciones de búsqueda rápida (Hoy, Ayer, Última semana, etc.)
- Tabla de facturas paginada, ordenable y con scroll
- Integración con API para carga dinámica de datos
- Experiencia de usuario profesional: estados de carga, mensajes de vacío y manejo de errores

## 🖥️ Primeros Pasos

### Requisitos Previos
- Node.js (recomendado v18+)
- Angular CLI (`npm install -g @angular/cli`)
- versión de Angular 20

### Instalación
```bash
npm install
```

### Servidor de Desarrollo
```bash
npm start
```
Visita [http://localhost:4200/](http://localhost:4200/) en tu navegador. La app se recarga automáticamente al guardar cambios.

### Requisitos de la API
- La API backend debe estar corriendo y accesible en `http://127.0.0.1:3000/api/v1/invoices/fetch_by_date_range` (configurable en el código).
- La API debe soportar peticiones GET con los parámetros: `start_date`, `end_date`, `page`, `per_page`.

## 🧩 Estructura del Proyecto
- `src/app/components/invoices/` — Funcionalidad principal de facturas (tabla, filtros, UI)
- `src/app/` — Raíz y configuración de la app
- `src/styles.css` — Estilos globales y de Material

## 🛠️ Comandos Útiles
- **Build:** `ng build` — Compilación de producción en `dist/`
- **Tests unitarios:** `ng test`
- **Lint:** `ng lint`

## 📝 Personalización
- Actualiza los endpoints de la API o los estilos de la UI según tus necesidades en los archivos de componentes.
- Extiende fácilmente con más filtros, opciones de exportación o columnas personalizadas.

## 🤝 Contribuciones
¡Pull requests y sugerencias son bienvenidas! Por favor abre un issue primero para discutir cambios importantes.

## 📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT.

---

Hecho con ❤️ usando Angular.
