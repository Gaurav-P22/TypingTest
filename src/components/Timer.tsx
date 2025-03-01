import React, { useEffect } from "react";

interface TimerProps {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft, isActive, setIsActive }) => {
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
    }, [isActive, timeLeft, setTimeLeft]);

    return <p className="  text-amber-200 ">Time Left: {timeLeft}s</p>;
};

export default Timer;
