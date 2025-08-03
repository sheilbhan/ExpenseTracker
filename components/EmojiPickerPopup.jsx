import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      {/* Trigger */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg overflow-hidden">
          {icon ? (
            <img
              src={icon}
              alt="Icon"
              className="w-12 h-12 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-gray-700">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="relative z-20">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || '');
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
