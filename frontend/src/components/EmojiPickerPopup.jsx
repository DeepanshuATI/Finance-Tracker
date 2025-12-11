import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        console.log("Emoji Object:", emojiObject); 
        const iconValue = emojiObject?.emoji || ""; 
        if (!iconValue) {
            console.warn("Malformed emoji object received:", emojiObject);
        }
        onSelect(iconValue);
        setIsOpen(false);
    };

    const safeIcon =
        typeof icon === "string" && (icon.startsWith("http") || icon.includes("data:image"))
            ? icon
            : icon || "";

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mg-6">
            <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
                    {safeIcon ? (
                        <img src={safeIcon} alt="Icon" className="w-12 h-12" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                    <EmojiPicker
                        onEmojiClick={(event, emojiObject) => handleEmojiClick(emojiObject)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;


