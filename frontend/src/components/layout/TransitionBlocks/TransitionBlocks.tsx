import React from 'react';
import { createPortal } from 'react-dom';

const root = typeof window !== 'undefined' ? document.querySelector('#modal-root') : null;

function TransitionBlocks() {
    const Component = (
        <div className="transition-blocks-wrapper">
            <div className="transition-white-bg-right js-transition-white-bg-right"></div>
            <div className="transition-white-bg-left js-transition-white-bg-left"></div>
        </div>
    );

    return root ? createPortal(Component, root) : Component;
}

export default TransitionBlocks;
