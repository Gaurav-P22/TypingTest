import React from "react";

const BoomEffect: React.FC = () => {
    return (
        <div className="relative mt-4 flex flex-col items-center">
            <div className="text-6xl font-bold text-red-500 animate-ping">💥 BOOM! 💥</div>
            <p className="text-xl text-yellow-400 font-bold mt-2">Test Completed!</p>
        </div>
    );
};

export default BoomEffect;
