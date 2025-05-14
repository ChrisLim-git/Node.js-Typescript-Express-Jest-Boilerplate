# Node.js/TypeScript Boilerplate

A clean, extensible boilerplate for building Node.js services with TypeScript, Express, and Jest.

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

## Usage

- Start building your API by adding controllers, services, and repositories.
- Use the provided structure for rapid prototyping and easy scaling.
- Replace in-memory logic with persistent storage as needed.

---

This project is a starting point for any Node.js/TypeScript backend application. Customize as needed for your use case.
