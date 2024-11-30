import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  Plus,
  Minus
} from 'lucide-react';
import { useTextContext } from '../context/TextContext';

const FONT_FAMILIES = [
  'Arial', 'Times New Roman', 'Courier New', 'Verdana',
  'Georgia', 'Palatino Linotype', 'Garamond', 'Bookman Old Style',
  'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
];

const TextFormattingBar = ({ selectedTextId }) => {
  const { texts, updateText } = useTextContext();
  const selectedText = texts.find(t => t.id === selectedTextId);

  const toggleTextStyle = (styleType) => {
    switch(styleType) {
      case 'bold':
        updateText(selectedTextId, {
          fontWeight: selectedText.fontWeight === 'bold' ? 'normal' : 'bold'
        });
        break;
      case 'italic':
        updateText(selectedTextId, {
          fontStyle: selectedText.fontStyle === 'italic' ? 'normal' : 'italic'
        });
        break;
      case 'underline':
        updateText(selectedTextId, {
          textDecoration: selectedText.textDecoration === 'underline' ? 'none' : 'underline'
        });
        break;
      default:
        break;
    }
  };

  const changeFontSize = (direction) => {
    const currentSize = selectedText?.fontSize || 16;
    const newSize = direction === 'increase' 
      ? Math.min(currentSize + 2, 72) 
      : Math.max(currentSize - 2, 8);
    
    updateText(selectedTextId, { fontSize: newSize });
  };

  return (
    <div className="lg:w-1/2 md:w-full p-2 gap-4 flex items-center">
      <select
        value={selectedText?.fontFamily || 'Arial'}
        onChange={(e) => updateText(selectedTextId, { fontFamily: e.target.value })}
        className="w-full h-12 p-1 outline-none rounded border"
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>

      <div className="flex items-center border rounded h-12">
        <button 
          onClick={() => changeFontSize('decrease')}
          className="p-2  "
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={selectedText?.fontSize || 16}
          onChange={(e) => updateText(selectedTextId, { fontSize: parseInt(e.target.value) })}
          min="8"
          max="72"
          className="w-16 text-center rounded outline-none"
        />
        <button 
          onClick={() => changeFontSize('increase')}
          className="p-2  "
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex h-12 space-x-2">
        <button
          onClick={() => toggleTextStyle('bold')}
          className={`
            p-1 rounded-sm w-10 h-10 flex items-center justify-center
            ${selectedText?.fontWeight === 'bold' ? 'bg-blue-500 text-white' : 'bg-white border'}
            hover:bg-gray-100 transition-colors
          `}
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => toggleTextStyle('italic')}
          className={`
            p-1 rounded-sm w-10 h-10 flex items-center justify-center
            ${selectedText?.fontStyle === 'italic' ? 'bg-blue-500 text-white' : 'bg-white border'}
            hover:bg-gray-100 transition-colors
          `}
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={() => toggleTextStyle('underline')}
          className={`
            p-1 rounded-sm w-10 h-10 flex items-center justify-center
            ${selectedText?.textDecoration === 'underline' ? 'bg-blue-500 text-white' : 'bg-white border'}
            hover:bg-gray-100 transition-colors
          `}
        >
          <Underline className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TextFormattingBar;