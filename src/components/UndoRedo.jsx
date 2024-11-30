import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import { useTextContext } from '../context/TextContext';

const UndoRedoControls = () => {
  const { undo, redo, canUndo, canRedo } = useTextContext();

  return (
    <div className="flex h-16 items-center space-x-4">
      <button 
        onClick={undo}
        disabled={!canUndo}
        className={`
          p-1 rounded 
          ${!canUndo 
            ? 'opacity-50 cursor-not-allowed text-gray-500' 
            : 'hover:bg-gray-200 active:bg-gray-300'
          }
        `}
        aria-label="Undo"
        title="Undo"
      >
        <Undo2 className="w-6 h-6" />
      </button>
      <button 
        onClick={redo}
        disabled={!canRedo}
        className={`
          p-1 rounded 
          ${!canRedo 
            ? 'opacity-50 cursor-not-allowed text-gray-500' 
            : 'hover:bg-gray-200 active:bg-gray-300'
          }
        `}
        aria-label="Redo"
        title="Redo"
      >
        <Redo2 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default UndoRedoControls;