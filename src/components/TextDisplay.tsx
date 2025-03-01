import React from "react";

interface TextDisplayProps {
    passage: string;
    userInput: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ passage, userInput }) => {
    return (
        <p className="text-lg font-mono bg-gray-700 p-4 rounded-md leading-relaxed">
            {passage.split("").map((char, index) => {
                let charClass = "text-white"; // Default color
                if (index < userInput.length) {
                    charClass = userInput[index] === char ? "text-green-400" : "text-red-400";
                } else if (index === userInput.length) {
                    charClass = "bg-yellow-400 text-black px-1 rounded"; // Highlight current character
                }

                return (
                    <span key={index} className={`${charClass}`}>
                        {char}
                    </span>
                );
            })}
        </p>
    );
};

export default TextDisplay;
