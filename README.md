# Node.js/TypeScript Boilerplate

A clean, extensible boilerplate for building Node.js services with TypeScript, Express, and Jest.

This project follows a **layered (n-tier) architecture** pattern, which is common in backend application development. Each layer has a distinct responsibility, promoting separation of concerns, modularity, and testability.

## Features

- **Express.js API structure**
- **TypeScript strict mode** for type safety
- **Jest** for unit testing
- **pnpm** for fast, strict dependency management
- **Modular architecture**: controllers, services, repositories, interfaces
- **No persistent storage**: in-memory data for rapid prototyping

## Tech Stack

- Node.js 20+
- TypeScript 5.7+
- Express.js
- pnpm
- Jest

## Getting Started

1. **Install dependencies**
   ```cmd
   pnpm install
   ```
2. **Run the development server**
   ```cmd
   pnpm run dev
   ```
3. **Run tests**
   ```cmd
   pnpm test
   ```

## Project Structure

```
project/
├── src/
│   ├── repositories/      # Data layer implementations
│   ├── services/          # Business logic (Customer, Portfolio, Deposit)
│   ├── interfaces/        # Type definitions/Models/Entities
│   ├── controllers/       # API request handlers
│   ├── decorators/        # Custom TypeScript decorators
│   └── app.ts             # Express server setup
├── tests/                 # Jest test suite
├── package.json           # pnpm workspace config
└── tsconfig.json          # TypeScript configuration
```

### How to Debug

- **Starting Point:**  
  The application entry point is `src/app.ts`. This file initializes the Express server, registers controllers, and starts listening for requests.
- **Ending Point:**  
  The "ending point" is typically when the server stops running (e.g., process exit or manual termination). For HTTP requests, the ending point is when a controller sends a response.

#### Debugging in VS Code

1. **Set breakpoints:**  
   Open any `.ts` file (e.g., `src/controllers/CustomerController.ts`) and click in the gutter to set breakpoints.
2. **Launch Debugger:**  
   Press `F5` or go to the Run & Debug panel and start the "Launch Program" configuration. Make sure your `launch.json` is set up to run `ts-node` or compiled JavaScript from `dist/`.
3. **Inspect Variables & Call Stack:**  
   Use the Debug panel to step through code, inspect variables, and view the call stack.

## Layered Flow
Below is a typical flow of how a request moves through the main layers of the project:

```
                ## Client ##
      (HTTP Request)      (HTTP Response)
           │                     ▲
           ▼                     │
      ┌─────────────────────────────┐
      │        Express App          │
      │        (src/app.ts)         │
      └─────────────────────────────┘
           │                     ▲
           ▼                     │
      ┌─────────────────────────────┐
      │        Controller           │
      │   (src/controllers/)        │
      └─────────────────────────────┘
           │                     ▲
           ▼                     │
      ┌─────────────────────────────┐
      │         Service             │
      │    (src/services/)          │
      └─────────────────────────────┘
           │                     ▲
           ▼                     │
      ┌─────────────────────────────┐
      │        Repository           │
      │   (src/repositories/)       │
      └─────────────────────────────┘
           │                     ▲
           ▼                     │
      ┌─────────────────────────────┐
      │      In-Memory Data         │
      └─────────────────────────────┘            
```

- **app.ts**: Entry point, sets up Express and routes.
- **Controller**: Handles HTTP requests, validates input, and calls services.
- **Service**: Contains business logic, coordinates data flow.
- **Repository**: Handles data access (currently in-memory, can be replaced with a database).
- **Interfaces**: Define types and contracts used across all layers.

### Layers Explained

- **Presentation Layer (Express App & Controllers):**
  - The entry point (`src/app.ts`) and controllers handle HTTP requests and responses.
  - Controllers validate input, manage request/response flow, and delegate business logic to services.

- **Business Logic Layer (Services):**
  - Services (`src/services/`) contain the core business logic.
  - They coordinate data flow between controllers and repositories, enforce business rules, and process data.

- **Data Access Layer (Repositories):**
  - Repositories (`src/repositories/`) abstract data storage and retrieval.
  - They interact with in-memory data (or a database, if extended) and provide a consistent interface for services.

- **Data/Model Layer (Interfaces):**
  - Interfaces (`src/interfaces/`) define TypeScript types and contracts for entities used throughout the application.


## Usage

- Start building your API by adding controllers, services, and repositories.
- Use the provided structure for rapid prototyping and easy scaling.
- Replace in-memory logic with persistent storage as needed.

---

This project is a starting point for any Node.js/TypeScript backend application. Customize as needed for your use case.
