import React from "react";

interface TypingInputProps {
    userInput: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypingInput: React.FC<TypingInputProps> = ({ userInput, handleInputChange }) => {
    return (
        <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Start typing..."
            autoFocus
            className="w-1/2 p-4 text-gray-900 mt-4 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};

export default TypingInput;
