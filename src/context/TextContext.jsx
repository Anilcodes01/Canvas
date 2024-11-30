import React, { createContext, useState, useContext, useCallback } from 'react';

const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [texts, setTexts] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const updateHistory = useCallback((newTexts) => {
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    setHistory([...newHistory, newTexts]);
    setCurrentHistoryIndex(newHistory.length);
  }, [history, currentHistoryIndex]);

  const addText = useCallback((newText) => {
    if (!newText.trim()) return;

    const newTextItem = {
      id: Date.now(),
      content: newText,
      x: 50,
      y: 50,
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    };

    const updatedTexts = [...texts, newTextItem];
    setTexts(updatedTexts);
    updateHistory(updatedTexts);
  }, [texts]);

  const updateText = useCallback((id, updates) => {
    const updatedTexts = texts.map(text => 
      text.id === id ? { ...text, ...updates } : text
    );
    setTexts(updatedTexts);
    updateHistory(updatedTexts);
  }, [texts]);

  const deleteText = useCallback((id) => {
    const updatedTexts = texts.filter(text => text.id !== id);
    setTexts(updatedTexts);
    updateHistory(updatedTexts);
  }, [texts]);

  const undo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setTexts(history[newIndex]);
      setCurrentHistoryIndex(newIndex);
    }
  }, [history, currentHistoryIndex]);

  const redo = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setTexts(history[newIndex]);
      setCurrentHistoryIndex(newIndex);
    }
  }, [history, currentHistoryIndex]);

  return (
    <TextContext.Provider value={{
      texts,
      addText,
      updateText,
      deleteText,
      undo,
      redo,
      canUndo: currentHistoryIndex > 0,
      canRedo: currentHistoryIndex < history.length - 1
    }}>
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error('useTextContext must be used within a TextProvider');
  }
  return context;
};