import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__hero">
        <div className="app-shell__eyebrow">React Flow workspace</div>
        <h1 className="app-shell__title">Workflow builder</h1>
        <p className="app-shell__subtitle">
          Design, connect, and test automation steps in a polished SaaS-style canvas.
        </p>
      </header>

      <main className="app-shell__body">
        <PipelineToolbar />
        <section className="workflow-stage">
          <PipelineUI />
        </section>
      </main>

      <SubmitButton />
    </div>
  );
}

export default App;
