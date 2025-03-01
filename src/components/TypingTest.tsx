import React, { useState, useEffect } from "react";
import TextDisplay from "./TextDisplay";
import TypingInput from "./TypingInput";
import StatsDisplay from "./StatsDisplay";
import Timer from "./Timer";

const TypingTest: React.FC = () => {
    const [passage, setPassage] = useState<string>("Loading...");
    const [userInput, setUserInput] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showBoom, setShowBoom] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<number>(60);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(100);

    // Fetch random passage
    const fetchPassage = async () => {
        try {
            const response = await fetch("https://dummyjson.com/quotes/random");
            const data = await response.json();
            setPassage(data.quote);
            setUserInput("");
            setIsActive(false);
            setShowBoom(false);
            setTimeLeft(selectedTime);
        } catch (error) {
            console.error("Error fetching passage:", error);
            setPassage("Failed to load passage. Please try again.");
        }
    };

    useEffect(() => {
        fetchPassage();
    }, []);

    // Handle typing input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isActive) setIsActive(true);
        const newInput = e.target.value;
        setUserInput(newInput);
    
        // Check if user finished typing
        if (newInput === passage) {
            setIsActive(false); // Stop the timer
            setTimeLeft(0); // Force timer to zero
            setShowBoom(true);
        }
    };
    
    // Calculate WPM & Accuracy
    useEffect(() => {
        if (timeLeft === 0 || userInput === passage) {
            setIsActive(false);
            setShowBoom(true);

            // Calculate WPM
            const wordsTyped = userInput.trim().split(/\s+/).length;
            setWpm(Math.round((wordsTyped / selectedTime) * 60));

            // Calculate Accuracy
            const correctChars = userInput.split("").filter((char, index) => char === passage[index]).length;
            const calculatedAccuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
            setAccuracy(calculatedAccuracy);
        }
    }, [timeLeft, userInput, passage, selectedTime]);

    // Restart Test
    const restartTest = () => {
        setUserInput("");
        setTimeLeft(selectedTime);
        setIsActive(false);
        setShowBoom(false);
        setWpm(0);
        setAccuracy(100);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl font-bold mb-4">Typing Test</h2>

            {/* Timer Selector */}
            <div className="mb-4">
                <label className="mr-2 text-lg">Select Time:</label>
                <select
                    className="bg-gray-700 p-2 rounded-md text-white"
                    value={selectedTime}
                    onChange={(e) => {
                        setSelectedTime(Number(e.target.value));
                        setTimeLeft(Number(e.target.value)); // Reset time when user changes it
                    }}
                >
                    <option value={15}>15s</option>
                    <option value={30}>30s</option>
                   
                </select>
            </div>

            {/* Timer */}
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} isActive={isActive} setIsActive={setIsActive} />

            {/* Typing Test Components */}
            {!showBoom ? (
                <>
                    <TextDisplay passage={passage} userInput={userInput} />
                    <TypingInput userInput={userInput} handleInputChange={handleInputChange} />
                    <StatsDisplay passage={passage} userInput={userInput} timeLeft={timeLeft} />
                </>
            ) : (
                <div className="flex flex-col items-center">
                    {/* "Boom" animation */}
                    <p className="text-6xl font-extrabold text-red-500 animate-bounce">💥 BOOM! 💥</p>
                    <p className="text-2xl mt-2">Typing Test Completed!</p>

                    {/* Show WPM & Accuracy */}
                    <p className="text-xl mt-2 text-green-400 font-semibold">WPM: {wpm}</p>
                    <p className="text-xl text-blue-400 font-semibold">Accuracy: {accuracy.toFixed(2)}%</p>

                    {/* Restart Button */}
                    <button
                        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                        onClick={restartTest}
                    >
                        Restart Test
                    </button>

                    {/* Next Passage Button */}
                    <button
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={fetchPassage}
                    >
                        Next Passage
                    </button>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
