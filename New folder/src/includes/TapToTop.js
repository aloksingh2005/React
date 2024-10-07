import React from "react";
import iconlySprite from "assets/svg/feather-icons/dist/feather-sprite.svg"; // Update the path according to your project structure

const TapToTop = () => (
    <div className="tap-top">
        <svg className="feather">
            <use href={`${iconlySprite}#arrow-up`}></use>
        </svg>
    </div>
);

export default TapToTop;
