// src/components/Sidebar/menuGroups/FrontOffice.js

import iconlySprite from "assets/svg/iconly-sprite.svg";

export const frontOfficeItems = [
    {
        key: "enquiry",
        label: "Enquiry",
        icon: `${iconlySprite}#Star`,
        dropdown: [
            { key: "enquiry-list", label: "Create New", path: "/enquiry/create" },
            { key: "enquiry-create", label: "Enquiry List", path: "/enquiry" },
        ],
    },
    {
        key: "class",
        label: "Class",
        icon: `${iconlySprite}#Star`,
        dropdown: [
            { key: "classes-list", label: "Create New", path: "/classes/create" },
            { key: "classes-create", label: "Classes List", path: "/classes" },
        ],
    },
    {
        key: "section",
        label: "Section",
        icon: `${iconlySprite}#Star`,
        dropdown: [
            { key: "section-list", label: "Create New", path: "/section/create" },
            { key: "section-create", label: "Section List", path: "/section" },
        ],
    },
];
