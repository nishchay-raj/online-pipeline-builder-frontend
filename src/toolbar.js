// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Core Nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                
                {/* Example Nodes */}
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='email' label='Email' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </div>
    );
};
