// src/components/Sidebar/menuGroups/FrontOffice.js

import iconlySprite from "assets/svg/iconly-sprite.svg";

export const studentMasterItems = [
    {
        key: "registration",
        label: "Registration",
        icon: `${iconlySprite}#Star`,
        dropdown: [
            { key: "registration-create", label: "Create New", path: "/registration/create" },
            { key: "registration-list", label: "Registration List", path: "/registration" },
        ],
    },
];
