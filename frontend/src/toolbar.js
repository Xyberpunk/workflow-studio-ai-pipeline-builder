// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_PALETTE } from './utils/nodeFactory';

export const PipelineToolbar = () => {

    return (
        <div className="mt-5">
            <div className="flex gap-3 overflow-x-auto pb-1">
                {NODE_PALETTE.map((node) => (
                    <DraggableNode key={node.type} node={node} />
                ))}
            </div>
        </div>
    );
};
