import React from "react";

interface StatsDisplayProps {
    passage: string;
    userInput: string;
    timeLeft: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ passage, userInput, timeLeft }) => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const correctChars = userInput.split("").filter((char, index) => char === passage[index]).length;
    const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
    const wpm = timeLeft < 60 ? Math.round((wordsTyped / (60 - timeLeft)) * 60) : 0;

    return (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <p className="text-2xl font-bold text-green-400">WPM: {wpm}</p>
            <p className="text-2xl font-bold text-blue-400">Accuracy: {accuracy.toFixed(2)}%</p>
        </div>
    );
};

export default StatsDisplay;
