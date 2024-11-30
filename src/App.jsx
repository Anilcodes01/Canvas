import React, { useState } from 'react';
import CanvasArea from './components/Canvas';
import Toolbar from './components/Toolbar';
import TextFormattingBar from './components/TextFormattingBar';
import { TextProvider } from './context/TextContext';
import UndoRedoControls from './components/UndoRedo';

const TextEditorApp = () => {
  const [selectedTextId, setSelectedTextId] = useState(null);

  return (
    <TextProvider>
      <div className="flex flex-col items-center  bg-gray-200 h-screen">

       <div className='h-16 flex bg-gray-100 items-center justify-between  w-full'>
        <div className='w-1/2 font-bold text-3xl lg:pl-12 pl-2'>
          Celebrare
        </div>
        <div className='flex items-start b w-1/2'>
        <UndoRedoControls />
        </div>

       </div>
       
        <div className="flex-grow mt-2 w-full lg:items-center flex flex-col">
          <CanvasArea 
            onTextSelect={setSelectedTextId} 
          />
          <div className='flex flex-col items-center w-full justify-center '>
          
            <TextFormattingBar 
              selectedTextId={selectedTextId} 
            />
          
          <Toolbar />
         
          </div>
        </div>
      </div>
    </TextProvider>
  );
};

export default TextEditorApp;