import React, { useState } from 'react';
import { useTextContext } from '../context/TextContext';

const Toolbar = () => {
  const [newText, setNewText] = useState('');
  const { addText, undo, redo, canUndo, canRedo } = useTextContext();

  const handleAddText = () => {
    addText(newText);
    setNewText('');
  };

  return (
    <div className="flex p-2  space-x-2 items-center">
      <input 
        type="text" 
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Enter text"
        className="border p-1 outline-none rounded flex-grow"
      />
      <button 
        onClick={handleAddText} 
        className="bg-blue-500 text-white p-1 px-2 rounded"
      >
        Add Text
      </button>
     
    </div>
  );
};

export default Toolbar;