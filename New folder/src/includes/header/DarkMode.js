import React, { useEffect, useState, useCallback } from "react";
import iconlySprite from "assets/svg/iconly-sprite.svg";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("mode") === "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const toggleDarkMode = useCallback(() => {
        const newMode = !isDarkMode ? "dark" : "light";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("mode", newMode);
    }, [isDarkMode]);

    return (
        <li className="modes d-flex" onClick={toggleDarkMode}>
            <a className={`dark-mode ${isDarkMode ? "active" : ""}`}>
                <svg className="svg-color">
                    <use href={`${iconlySprite}#Moon`}></use>
                </svg>
            </a>
        </li>
    );
};

export default DarkMode;