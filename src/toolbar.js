// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <section className="toolbar-panel">
            <div className="toolbar-panel__heading">
                <div>
                    <div className="toolbar-panel__eyebrow">Workflow palette</div>
                    <h1 className="toolbar-panel__title">Build automation flows visually</h1>
                </div>
                <p className="toolbar-panel__description">
                    Drag nodes into the canvas to compose SaaS-style workflow automation.
                </p>
            </div>
            <div className="toolbar-palette">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='email' label='Email' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </section>
    );
};
