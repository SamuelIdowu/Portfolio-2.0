# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend Setup (Node.js + Express + MongoDB)

1. Create a new folder called `server` in the project root.
2. Initialize a Node.js project and install dependencies:
   ```bash
   cd server
   npm init -y
   npm install express mongoose cors dotenv
   npm install --save-dev nodemon
   ```
3. Create the following folder structure inside `server/`:
   - models/
   - routes/
   - controllers/
   - middleware/
   - server.js
4. Implement models for Project, Skill, and User as per the PRD.
5. Create API endpoints for projects and skills.
6. Start the backend server with `nodemon server.js`.
7. Connect the frontend to the backend API.

Refer to the PRD for schema and endpoint details.
