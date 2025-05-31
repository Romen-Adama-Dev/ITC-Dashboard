# ITC Dashboard Project

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Romen-Adama-Dev_ITC-Dashboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Romen-Adama-Dev_ITC-Dashboard)

> **Interactive, modular dashboards in Angular**  
> A reusable component library and demo application for building drag-and-drop, data-reactive dashboards—fully themed, i18n-ready, and enterprise-grade.

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

The **ITC Dashboard Project** (Final Degree Project at the Instituto Tecnológico de Canarias under NextGenDem research) provides:

- A **modular Angular library** of chart components (`ngx-charts`-based) for bar, line, pie, area, gauge, box and more.
- A **drag-and-drop dashboard** powered by angular-gridster2, allowing users to resize, rearrange and configure widgets at runtime.
- **Reactive data flows** built on RxJS, so any JSON or WebSocket source propagates instantly to all subscribed charts.
- **No-code customization** via Angular Forms and NG-Zorro modals: choose chart type, data source, item count, theme (light/dark) and localization (i18n via `ngx-translate`).
- A **Clean Architecture** separation (Domain → Application → Infrastructure → Presentation) that ensures maintainability and extensibility.
- **Accessibility best practices** (WCAG AA contrast, keyboard navigation, ARIA attributes) and **internationalization** in multiple languages (ES, EN, +3).
- **Enterprise-grade code quality** with SonarCloud, ESLint, Conventional Commits and automatically generated documentation via Compodoc.

This repository contains both the reusable component library (`projects/`) and a stand-alone demo application (`src/`) that illustrates how to embed the library into any Angular workspace.

---

## 🔧 Prerequisites

- **Node.js** (LTS recommended; tested on v18.x and v20.x)  
- **npm** (v8.x or higher) or **yarn** (v1.22+)  
- **Angular CLI** (v19.x) installed globally  
- A modern browser (Chrome, Firefox, Safari) for development and demonstration

---

## ⚡ Getting Started

### Clone & Install

1. Clone the repository and navigate to its root.  
2. Install dependencies using your preferred package manager.

### Available Scripts

From the root folder, you can run:

- **Serve the demo application** (with live reload)  
- **Build both the library and the demo** for production  
- **Run unit tests** via Karma & Jasmine  
- **Run end-to-end tests** (Cypress or Protractor can be configured)  
- **Lint all TypeScript and HTML files**  
- **Generate Compodoc documentation** (output in `documentation/` folder)  
- **List available Angular CLI schematics**

> _Note: Replace npm with yarn if you prefer._

---

## 📁 Folder Structure
├── angular.json                       # Angular CLI workspace configuration
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript configuration
├── eslint.config.js                   # ESLint Flat Configuration
├── README.md                          # ← You are here
├── documentation/                     # Auto-generated Compodoc docs
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
│   └── i18n/                      # Translation JSON files (en.json, es.json, …)
├── environments/                  # Angular environment configs (dev/prod)
├── index.html                     # Demo entry point (theme  tags, root component)
└── main.ts                        # Bootstrap Angular, register i18n & Mediator

---

## ⭐ Key Features

1. **Drag-and-Drop Dashboard**  
   - Based on `angular-gridster2`.  
   - Widgets can be moved, resized, locked/unlocked, serialized to JSON and reloaded.

2. **Modular Chart Components**  
   - Built on `ngx-charts` and `d3-shape`.  
   - Each chart (bar, line, pie, area, gauge, box, heatmap, etc.) lives in its own Angular component.  
   - Chart configuration (theme, axes, colors, labels) flows reactively via `ChartHelperService`.

3. **Reactive Data Flows (RxJS)**  
   - `MediatorService` acts as a centralized event bus.  
   - Chart components subscribe to `MediatorService.events$` and call `processEvent(...)` to update themselves instantly.  
   - `ChartDataService` fetches JSON or real-time WebSocket data and exposes an `Observable<ChartData[]>`.

4. **No-Code Customization UI**  
   - Add a widget via `ChartSelectionModalComponent`: pick chart type, data source (local JSON, REST, WebSocket).  
   - Edit a widget via `EditWidgetModalComponent`: adjust `dataCount`, axis labels, palette, title, legend and tooltip visibility.  
   - Language dropdown uses `ngx-translate` for dynamic UI translation.

5. **Theming & Accessibility**  
   - Light & Dark themes defined in `styles/default.less` and `styles/dark.less`.  
   - Theme toggle button dynamically enables/disables `<link id="dark-theme-css">`.  
   - WCAG AA contrast ratios, keyboard navigation (`tabindex`, `(keydown.enter)`), and ARIA attributes across all interactive elements.

6. **Clean Architecture**  
   - **Domain Layer:** `chart.model.ts`—pure TypeScript interfaces (`ChartConfig`, `ChartData`).  
   - **Application Layer:** `ChartHelperService` (event processing), `MediatorService` (event bus), `ChartDataService` (data fetching/caching).  
   - **Infrastructure Layer:** HTTP adapters, JSON fixtures in `assets/datasets/`, potential interceptors (auth/logging).  
   - **Presentation Layer:** Angular components & NG-Zorro UI, Gridster2 dashboard, shared buttons & modals.

---

## 📐 Code Quality & Documentation

- **Linting & Formatting**  
  - ESLint flat-config (`eslint.config.js`) enforces TypeScript best practices, Angular style rules and template accessibility (`@angular-eslint/template-accessibility`).  
  - To lint all files, run the lint command as listed in “Available Scripts”.  
  - Automatic fixes can be applied where possible via the lint tool’s “fix” option.

- **Static Analysis (SonarCloud)**  
  - A Quality Gate runs on every pull request.  
  - Key metrics: coverage > 80%, controlled cyclomatic complexity, zero critical vulnerabilities.  
  - The SonarCloud badge at the top of this README reflects current status.

- **Unit Testing**  
  - Jasmine + Karma for component and service tests.  
  - Running tests also generates a coverage report.

- **End-to-End Testing**  
  - Integration with Cypress or Protractor can be configured as needed.  

- **Documentation (Compodoc)**  
  - Generates automatic HTML documentation for services, modules, components and interfaces.  
  - The output is served from the `documentation/` folder and can be viewed in a browser.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork & Clone**  
   - Fork the repository on GitHub and clone your fork locally.  
   - Create a new feature branch for your changes.

2. **Code, Test & Lint**  
   - Ensure all new code is covered by unit tests.  
   - Run the linting tool and fix any reported issues before committing.  
   - Update `CHANGELOG.md` and bump the version in `package.json` if required.

3. **Commit Message Convention**  
   - Follow Conventional Commits, for example:  
     - `feat(chart): add new radial-gauge component`  
     - `fix(dashboard): correct widget positioning bug`  
     - `docs(readme): update installation instructions`

4. **Push & Create Pull Request**  
   - Push your feature branch to your fork.  
   - Open a pull request against the `main` branch in the original repository, with a clear description, issue references and any relevant screenshots.  
   - Wait for CI checks (linting, tests, SonarCloud) to pass before merging.

---

## 📜 License

This project is licensed under the MIT License.  
Refer to the [LICENSE](LICENSE) file for full details.

_Open-Source & Free to Use — credit must be given in derivative works._

---

## 🙏 Acknowledgements

- NextGenDem (ITC) for funding and domain expertise.  
- Swimlane (`ngx-charts`), Angular-Gridster2, NG-Zorro, `ngx-translate` teams for outstanding open-source libraries.  
- StackOverflow and the Angular community for troubleshooting and sharing best practices.  
- My family, friends, mentors … and tools like ChatGPT / CoPilot for assistance in content generation and coding.

---

### Explanation of Changes and Improvements

1. **Title & Badge**  
   - SonarCloud badge in the header shows Quality Gate status at a glance.  
   - Subtitle offers a concise summary of the project’s purpose.

2. **Table of Contents**  
   - Quick navigation to key sections improves reader experience.

3. **Project Overview**  
   - Concise summary of the project, its components and main objectives.  
   - Mentions real-world integration with NextGenDem (ITC) and layered architecture.

4. **Prerequisites**  
   - Clearly lists minimum versions and required tools before cloning.

5. **Getting Started**  
   - Provides high-level instructions for cloning, installing and running the demo.  
   - Lists all available scripts without full bash syntax, for a cleaner presentation.

6. **Folder Structure**  
   - Describes the organization of directories: `projects/` for the library, `src/` for the demo.  
   - Helps new contributors find each module quickly.

7. **Key Features**  
   - Details primary functionalities: drag-and-drop dashboard, modular chart components, RxJS flows, theming, accessibility, Clean Architecture, etc.  
   - Links to original third-party repositories where appropriate.

8. **Code Quality & Documentation**  
   - Explains how linting (ESLint flat config), static analysis (SonarCloud), testing (Karma/Jasmine, e2e), and documentation (Compodoc) work.  
   - Includes the commands in plain text form as part of “Available Scripts.”

9. **Contributing**  
   - Outlines a straightforward workflow: forks, branches, commit conventions and pull request process.  
   - Highlights the use of Conventional Commits and a CI checklist.

10. **License**  
    - Clarifies MIT licensing and freedom to use, modify and redistribute.

11. **Acknowledgements**  
    - Credits NextGenDem (ITC), key open-source libraries and personal acknowledgments (family, friends, mentors, ChatGPT/CoPilot).