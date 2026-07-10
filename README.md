# Online Pipeline Builder - Frontend

A React-based visual workflow builder that allows users to create pipelines by connecting customizable nodes through an interactive drag-and-drop interface. The application validates the constructed pipeline by communicating with a backend service that detects cycles and verifies whether the graph forms a Directed Acyclic Graph (DAG).

## Features

- Drag-and-drop node creation
- Interactive edge connections
- Multiple custom node types
- Real-time node editing
- Automatic graph validation
- Responsive user interface
- Backend API integration

## Tech Stack

- React
- React Flow
- JavaScript
- CSS
- Axios

## Project Structure

```
src/
├── components/
├── nodes/
├── store/
├── styles/
├── toolbar/
├── submit/
└── utils/
```

## Architecture

```
User
    │
    ▼
React Components
    │
React Flow
    │
Global State (Zustand)
    │
Submit Pipeline
    │
REST API
    │
Backend Validation
```

## How It Works

1. Drag nodes onto the canvas.
2. Connect nodes to create a workflow.
3. Configure node properties.
4. Submit the pipeline.
5. Backend validates the graph.
6. Validation results are displayed to the user.

## Key Features Implemented

- Custom React Flow nodes
- Dynamic edge creation
- Global state management using Zustand
- API communication with backend
- Pipeline submission
- Interactive graph editing
- User-friendly validation feedback

## Getting Started

```bash
git clone https://github.com/nishchay-raj/online-pipeline-builder

npm install

npm start
```
# Run Backend

run ```uvicorn main:app --reload``` in the terminal

## Future Improvements

- Pipeline persistence
- User authentication
- Real-time collaboration
- Undo/Redo functionality
- Export and import pipelines
- Pipeline versioning

## Author

**Nishchay Raj**

Full Stack Developer
