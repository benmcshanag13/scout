# Contributing to Scout

Thank you for considering contributing to Scout! This document outlines the process and guidelines for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Device/OS information
- React Native version

### Suggesting Features

Feature suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this feature would be useful
- Include mockups or examples if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

## Development Process

### Setting Up Development Environment

1. Follow the setup instructions in [README.md](README.md)
2. Ensure all tests pass before making changes
3. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

### Coding Standards

#### TypeScript/React Native

- Use TypeScript for all new code
- Follow React hooks best practices
- Use functional components over class components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful variable and function names

#### Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` before committing
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements

#### File Naming

- Components: `PascalCase.tsx` (e.g., `ProfileScreen.tsx`)
- Utilities/Services: `camelCase.ts` (e.g., `apiClient.ts`)
- Types: `PascalCase.ts` (e.g., `InspectorReport.ts`)
- Styles: Co-locate with component files

### Commit Messages

Write clear and meaningful commit messages:

```
feat: add real-time location updates to map screen
fix: resolve marker clustering issue on zoom
docs: update API documentation for report endpoint
refactor: simplify authentication flow
test: add unit tests for inspector report validation
```

Use these prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for meaningful test coverage
- Test on both Android and iOS when possible

### Pull Request Guidelines

- Fill out the pull request template completely
- Link related issues
- Include screenshots/videos for UI changes
- Ensure CI checks pass
- Request review from maintainers
- Be responsive to feedback

## Project Structure Guidelines

### Adding New Screens

Place new screens in `src/screens/` and update navigation accordingly.

### Adding New Components

- Place reusable components in `src/components/`
- Create component-specific folders for complex components
- Include component documentation in comments

### State Management

- Use Zustand stores in `src/store/`
- Keep stores focused and modular
- Document store structure and actions

### API Integration

- Add API calls to `src/services/`
- Use TypeScript interfaces for request/response types
- Handle errors consistently

## Python Backend Contributions

### Backend Standards

- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for classes and functions
- Use async/await for I/O operations

### API Design

- Follow RESTful conventions
- Version API endpoints (e.g., `/api/v1/`)
- Document endpoints in `docs/API.md`
- Include request/response examples

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the question label
- Reach out to the maintainers

Thank you for contributing to Scout!
