# React + Vite + Antd + Vitest

A modern React application bootstrapped with Vite, styled with Ant Design, and tested with Vitest.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Ant Design 5** - UI component library
- **Vitest** - Unit testing framework
- **TypeScript** - Type safety
- **Testing Library** - React component testing utilities

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Testing

Run tests in watch mode:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── App.test.tsx     # Application tests
├── main.tsx         # Application entry point
├── index.css        # Global styles
├── vite-env.d.ts    # Vite type declarations
└── test/
    └── setup.ts     # Vitest setup file
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

