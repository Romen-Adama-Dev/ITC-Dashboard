# ITC Dashboard Project

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Romen-Adama-Dev_ITC-Dashboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Romen-Adama-Dev_ITC-Dashboard)

> **Interactive, modular dashboards in Angular**  
> A reusable component library and demo application for building drag-&-drop, data-reactive dashboards—fully themed, i18n-ready, and enterprise-grade.

---

## 🚀 Table of Contents

1. [Project Overview](#project-overview)  
2. [Prerequisites](#prerequisites)  
3. [Getting Started](#getting-started)  
   - [Clone & Install](#clone--install)  
   - [Available Scripts](#available-scripts)  
4. [Folder Structure](#folder-structure)  
5. [Key Features](#key-features)  
6. [Code Quality & Documentation](#code-quality--documentation)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Acknowledgements](#acknowledgements)  

---

## 📋 Project Overview

**ITC Dashboard Project** is a Final Degree Project of the Instituto Tecnológico de Canarias (ITC) under [NextGenDem](https://nextgendem.itc) research. It provides:

- A **modular Angular library** of chart components (`ngx-charts`-based) for bar, line, pie, area, gauge, box, and more.  
- A **drag-&-drop dashboard** powered by [angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2) that lets end users resize, rearrange, and configure widgets at runtime.  
- **Reactive data flows** built on RxJS—any JSON or WebSocket source propagates instantly to all subscribed charts.  
- **No-code customization** using Angular Forms and [NG-Zorro](https://ng.ant.design/) modals: choose chart type, data source, item count, theme (light/dark), and localization (i18n via `ngx-translate`).  
- A **Clean Architecture** separation (Domain → Application → Infrastructure → Presentation) to ensure maintainability and extensibility.  
- **Accessibility best practices** (WCAG AA contrast, keyboard navigation, ARIA attributes) and **internationalization** (ES, EN, +3 languages).  
- **Enterprise-grade code quality** with SonarCloud, ESLint, Conventional Commits, and automated documentation via Compodoc.

This repository contains both the reusable component library (`projects/`) and a stand-alone demo application (`src/`) that showcases how to embed it in any Angular workspace.

---

## 🔧 Prerequisites

- **Node.js** (LTS preferred; tested on v18.x and v20.x)  
- **npm** (v8.x or higher) or **yarn** (v1.22+)  
- **Angular CLI** globally installed (v19.x):  
  ```bash
  npm install -g @angular/cli@19

	•	A modern browser (Chrome, Firefox, Safari) for development/demo.

⸻

⚡ Getting Started

Clone & Install
	1.	Clone this repository

git clone https://github.com/mi-usuario/itc-dashboard.git
cd itc-dashboard


	2.	Install dependencies

npm install
# or
yarn install


	3.	Start the Demo Application

ng serve --open

The app will open at http://localhost:4200. Any code changes will trigger a live reload.

Available Scripts

Inside the root folder, run any of the following commands:

# Serve the demo application (with live reload)
ng serve

# Build both the library and demo for production
ng build itc-dashboard-library
ng build

# Run unit tests via Karma & Jasmine
ng test

# Run end-to-end tests (Cypress or Protractor can be configured)
ng e2e

# Lint all .ts and .html files
ng lint

# Generate Compodoc documentation (output in "documentation/" folder)
npm run docs       # (ver "package.json" para el script exacto)

# Print a list of available Angular CLI schematics
ng generate --help

Note: Replace npm run <script> with yarn <script> if you prefer Yarn.

⸻

📁 Folder Structure

.
├── angular.json                       # Angular CLI workspace configuration
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript configuration
├── eslint.config.js                   # ESLint Flat Configuration
├── README.md                          # ← You are here
├── documentation/                     # Compodoc generated docs
│
├── projects/
│   └── itc-dashboard-library/         # Reusable component library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── chart-components/  # All ngx-charts-based components
│       │   │   ├── services/          # MediatorService, ChartHelperService, ChartDataService
│       │   │   └── shared/            # Buttons, dropdowns, modals, accessibility utilities
│       │   └── public-api.ts
│       ├── package.json               # Library-specific dependencies & build settings
│       └── tsconfig.lib.json
│
└── src/
    ├── app/
    │   ├── application/               # Application layer (services, models, RxJS flows)
    │   ├── infrastructure/            # HTTP adapters (ChartDataService), JSON fixtures
    │   ├── presentation/              # Demo components using the library
    │   │   ├── gridster2/             # Dashboard container & layout
    │   │   ├── chart-selection-modal/ # Add-widget modal
    │   │   ├── edit-widget-modal/     # Configure-widget modal
    │   │   └── shared/                # Reusable UI (buttons, dropdowns, notifications)
    │   └── core/                      # Global configuration (i18n, theme toggler, icon provider)
    ├── assets/
    │   ├── datasets/                  # Example JSON files (data-set-1.json, data-set-2.json)
    │   └── i18n/                      # Translation JSON files (en.json, es.json, ...)
    ├── environments/                  # Angular environment configs (dev/prod)
    ├── index.html                     # Demo entry point (theme <link> tags, root component)
    └── main.ts                        # Bootstrap Angular, register i18n & Mediator


⸻

⭐ Key Features
	1.	Drag-&-Drop Dashboard
	•	Basado en angular-gridster2.
	•	Widgets pueden moverse, redimensionarse, bloquearse, serializarse a JSON y recargarse.
	2.	Modular Chart Components
	•	Construidos sobre ngx-charts y d3-shape.
	•	Cada gráfico (barras, líneas, pastel, área, gauge, caja, heatmap, etc.) existe en su propio componente Angular.
	•	La configuración del gráfico (tema, ejes, colores, etiquetas) fluye de manera reactiva a través de ChartHelperService.
	3.	Reactive Data Flows (RxJS)
	•	MediatorService actúa como un bus de eventos centralizado.
	•	Los componentes de gráficos se suscriben a MediatorService.events$ y llaman a processEvent(...) para actualizarse al instante.
	•	ChartDataService obtiene datos JSON o de WebSocket y expone Observable<ChartData[]>.
	4.	No-Code Customization UI
	•	Agrega un widget mediante ChartSelectionModalComponent: elige tipo de gráfico, fuente de datos (JSON local, REST, WebSocket).
	•	Edita un widget mediante EditWidgetModalComponent: ajusta dataCount, etiquetas de ejes, paleta, título, visibilidad de leyenda y tooltip.
	•	El desplegable de idiomas usa ngx-translate para traducción dinámica de la UI.
	5.	Theming & Accessibility
	•	Temas Claro y Oscuro definidos en styles/default.less y styles/dark.less.
	•	El botón de alternar tema activa/desactiva dinámicamente <link id="dark-theme-css">.
	•	Contraste WCAG AA, navegación por teclado (tabindex, (keydown.enter)), y atributos ARIA en todos los elementos interactivos.
	6.	Clean Architecture
	•	Domain Layer: chart.model.ts—interfaces TypeScript puras (ChartConfig, ChartData).
	•	Application Layer: ChartHelperService (procesamiento de eventos), MediatorService (bus de eventos), ChartDataService (obtención/cache de datos).
	•	Infrastructure Layer: Adaptadores HTTP, fixtures JSON en assets/datasets/, interceptores potenciales (auth/logs).
	•	Presentation Layer: Componentes Angular & UI NG-Zorro, dashboard Gridster2, botones y modales compartidos.

⸻

📐 Code Quality & Documentation
	•	Linting & Formatting
	•	ESLint flat-config (eslint.config.js) aplica buenas prácticas TypeScript, reglas de estilo Angular y accesibilidad en plantillas (@angular-eslint/template-accessibility).
	•	Para lintear todos los archivos:

npm run lint       # o: ng lint


	•	Para auto-arreglar donde sea posible:

npm run lint -- --fix


	•	Static Analysis (SonarCloud)
	•	El “Quality Gate” se ejecuta en cada Pull Request.
	•	Métricas clave: cobertura > 80%, complejidad ciclomática controlada, cero vulnerabilidades críticas.
	•	Badge de SonarCloud en la cabecera de este README.
	•	Unit Testing
	•	Jasmine + Karma para pruebas unitarias de componentes y servicios.
	•	Ejecuta todas las pruebas y genera informe de cobertura:

npm run test       # o: ng test


	•	End-to-End Testing
	•	(Opcional) Integra Cypress o Protractor según tu preferencia.
	•	Ejemplo (si usas Cypress):

npm run e2e        # o: ng e2e


	•	Documentation (Compodoc)
	•	Genera documentación HTML automática para servicios, módulos, componentes, interfaces:

npm run docs       # configurado a: compodoc -p tsconfig.doc.json -s


	•	Abre la vista en http://localhost:8080 tras ejecutar el comando.

⸻

🤝 Contributing

¡Se agradecen las contribuciones! Sigue estas pautas:
	1.	Fork & Clone

git clone https://github.com/mi-usuario/itc-dashboard.git
cd itc-dashboard


	2.	Crea una rama de característica

git checkout -b feature/SHORT-DESCRIPTION


	3.	Code, Test & Lint
	•	Asegúrate de que todo código nuevo esté cubierto por pruebas unitarias.
	•	Ejecuta npm run lint y corrige errores antes de commitear.
	•	Actualiza CHANGELOG.md y la versión en package.json si es necesario.
	4.	Convención de mensajes de commit
Sigue Conventional Commits, por ejemplo:

feat(chart): add new radial-gauge component
fix(dashboard): correct widget positioning bug
docs(readme): update installation instructions


	5.	Push & Pull Request

git push origin feature/SHORT-DESCRIPTION

	•	Abre un PR contra main.
	•	Incluye descripción clara, vincula issues relacionados y adjunta capturas de pantalla si cambiaste la UI.
	•	Espera a que CI (lint, tests, SonarCloud) pase antes de mergear.

⸻

📜 License

Este proyecto está licenciado bajo la MIT License.
Consulta el archivo LICENSE para más detalles.

Open-Source & Free to Use — dar crédito en obras derivadas.

⸻

🙏 Acknowledgements
	•	NextGenDem (ITC)
	•	Swimlane (ngx-charts), Angular-Gridster2, NG-Zorro, ngx-translate — bibliotecas clave open-source.
	•	StackOverflow y Angular Community para resolver dudas y compartir buenas prácticas.
	•	Mi familia, amigos, mentores… y tú, ¡ChatGPT/CoPilot! por la ayuda en generación de contenido y código.

⸻

Explicación de cambios y mejoras
	1.	Título & Badge
	•	El badge de SonarCloud en la cabecera muestra al instante el estado del Quality Gate.
	•	Subtítulo breve que resume el propósito del proyecto.
	2.	Tabla de contenidos
	•	Navegación rápida a secciones principales para mejorar la experiencia de lectura.
	3.	Project Overview
	•	Resumen conciso del proyecto, sus componentes y objetivos.
	4.	Prerequisites
	•	Listado claro de versiones mínimas y herramientas necesarias antes de clonar.
	5.	Getting Started
	•	Pasos de “Clone & Install” y descripción de los comandos disponibles.
	•	Incluye build, tests, lint y generación de documentación.
	6.	Folder Structure
	•	Describe la organización de carpetas: projects/ para la librería y src/ para la demo.
	•	Facilita a nuevos colaboradores encontrar rápidamente cada módulo.
	7.	Key Features
	•	Detalla las funcionalidades principales: dashboard drag-&-drop, componentes modulares, flujos RxJS, theming, accesibilidad, Clean Architecture, etc.
	•	Enlaces a repositorios originales y librerías de terceros.
	8.	Code Quality & Documentation
	•	Explica cómo funciona el linting (ESLint flat config), el análisis estático (SonarCloud), las pruebas (Karma/Jasmine, e2e), y la generación de docs (Compodoc).
	•	Incluye los comandos correspondientes.
	9.	Contributing
	•	Guía de flujo de trabajo: forks, ramas, convenciones de commits y Pull Requests.
	•	Menciona la convención de Conventional Commits y el checklist de CI.
	10.	License
	•	Aclara que es MIT y libre de usar, modificar y redistribuir.
	11.	Acknowledgements
	•	Créditos a NextGenDem (ITC), librerías open-source clave y reconocimientos personales.
