// src/components/Sidebar/menuItems.js
import { applicationsItems } from './menuGroups/Applications';
import { frontOfficeItems } from './menuGroups/FrontOffice';
import { generalItems } from './menuGroups/general';
import { studentMasterItems } from './menuGroups/StudentMaster';

export const menuItems = [
    {
        group: "General",
        items: generalItems,
    },
    {
        group: "Applications",
        items: applicationsItems,
    },
    {
        group: "Front Office",
        items: frontOfficeItems,
    },
    {
        group: "Student Master",
        items: studentMasterItems,
    },
    // Add more groups as needed
];
