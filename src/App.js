import { useEffect, useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return true;
    }

    if (storedTheme === 'light') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setIsDarkMode((current) => !current)}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDarkMode}
      >
        <span className="theme-toggle__icon" aria-hidden="true">
          {isDarkMode ? '☾' : '☼'}
        </span>
        <span className="theme-toggle__label">{isDarkMode ? 'Dark' : 'Light'} mode</span>
      </button>

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
          <PipelineUI isDarkMode={isDarkMode} />
        </section>
      </main>

      <SubmitButton />
    </div>
  );
}

export default App;
