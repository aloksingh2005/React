// src/components/Sidebar/menuGroups/Applications.js

import iconlySprite from "assets/svg/iconly-sprite.svg";

export const applicationsItems = [
    {
        key: "role",
        label: "Role",
        icon: `${iconlySprite}#Star`,
        dropdown: [
            { key: "role-list", label: "Create New", path: "/role/create" },
            { key: "role-create", label: "Role List", path: "/role" },
        ],
    },
    {
        key: "company",
        label: "Company",
        icon: `${iconlySprite}#Work`,
        dropdown: [
            { key: "company-list", label: "Create New", path: "/company/create" },
            { key: "company-create", label: "Company List", path: "/company" },
        ],
    },
];
