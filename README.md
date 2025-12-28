# Frontend Evaluation

A web application that allows users to view a list of posts and add new posts. Built using React, Vite, Ant Design, and Vitest.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Ant Design 5** - UI component library
- **Vitest** - Unit testing framework
- **TypeScript** - Type safety
- **Testing Library** - React component testing utilities

## Getting Started

### 1. Fork the Repository

Fork this repository to your own GitHub account.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Run the Tests

Run tests in watch mode:

```bash
npm test
```

Run tests once (CI mode):

```bash
npm run test -- --run
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

## To Raise PR

1. Create a new branch with your name in the parent repo
2. Raise a PR from your fork to the parent repo
3. Wait for the pipeline to pass
4. Submit your submission

## Build

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
├── App.tsx              # Main application component
├── App.css              # Application styles
├── App.test.tsx         # Application tests
├── main.tsx             # Application entry point
├── index.css            # Global styles
├── vite-env.d.ts        # Vite type declarations
├── test/
│   └── setup.ts         # Vitest setup file
└── screens/
    ├── Dashboard/       # Dashboard screen
    ├── Registration/    # Registration screen
    └── Post/            # Post screens
        ├── PostList/    # Post listing
        ├── PostDetails/ # Post details view
        └── PostAdd/     # Add new post form
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test -- --run` | Run tests once (CI mode) |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

## CI/CD

This project includes a GitHub Actions workflow that runs on pull requests:

1. **Lint Stage** - Runs ESLint to check for linting errors
2. **Test Stage** - Runs all unit tests (only if lint passes)

Both stages must pass for the PR to be mergeable.
