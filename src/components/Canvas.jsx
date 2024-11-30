import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useTextContext } from "../context/TextContext";
import { X, Move } from "lucide-react";

const CanvasArea = ({ onTextSelect }) => {
  const { texts, updateText, deleteText } = useTextContext();
  const [selectedTextId, setSelectedTextId] = useState(null);

  const handleTextSelect = (textId) => {
    setSelectedTextId(textId);
    onTextSelect(textId);
  };

  const handleCanvasClick = (e) => {
    // Prevent deselection if clicking on a text
    if (e.target.closest(".text-item")) return;

    // Unselect the text
    setSelectedTextId(null);
    onTextSelect(null);
  };

  return (
    <div
      className="relative lg:w-1/2 bg-white rounded shadow-lg h-full overflow-hidden"
      onClick={handleCanvasClick} // Attach the click handler
    >
      {texts.map((text) => (
        <Rnd
          key={text.id}
          size={{ width: "auto", height: "auto" }}
          position={{ x: text.x, y: text.y }}
          onDragStop={(e, d) => {
            updateText(text.id, { x: d.x, y: d.y });
          }}
          bounds="parent"
          className={`absolute group text-item
            ${
              selectedTextId === text.id
                ? "ring-1 ring-blue-500 rounded shadow-lg"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleTextSelect(text.id);
            }}
            style={{
              fontSize: `${text.fontSize}px`,
              fontFamily: text.fontFamily,
              color: text.color,
              fontWeight: text.fontWeight,
              fontStyle: text.fontStyle,
              textDecoration: text.textDecoration,
            }}
            className={`
              relative
              cursor-move
             
              px-3
              py-2
              rounded-md
              
              group-hover:bg-gray-50
              ${
                selectedTextId === text.id
                  ? "bg-blue-50 border-blue-300"
                  : "border-gray-200"
              }
            `}
          >
            {text.content}
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteText(text.id);
              }}
              className={`
                absolute
                -top-2
                -right-2
                bg-red-500
                hover:bg-red-600
                text-white
                rounded-full
                w-6
                h-6
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
              `}
            >
              <X className="w-4 h-4" />
            </button>
            {/* Move Handle */}
            <div
              className={`
                absolute
                bottom-0
                right-0
                text-gray-400
                opacity-0
                group-hover:opacity-100
              `}
            >
              <Move className="w-4 h-4" />
            </div>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default CanvasArea;
