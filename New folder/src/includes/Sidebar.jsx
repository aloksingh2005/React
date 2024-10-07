import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import featherSprite from "assets/svg/feather-icons/dist/feather-sprite.svg";
import iconlySprite from "assets/svg/iconly-sprite.svg";
import SidebarItem from "./sidebar/SidebarItem";
import { sidebarReducer } from "./sidebar/sidebarReducer";
import { menuItems } from "./sidebar/menuItems";

const Sidebar = () => {
    const location = useLocation();
    const [state, dispatch] = useReducer(sidebarReducer, {
        pinnedItems: {},
        activeDropdown: null,
    });

    const pinnedItems = Object.keys(state.pinnedItems).filter(key => state.pinnedItems[key]);

    // Set initial dropdown based on the current path
    useEffect(() => {
        const currentItem = menuItems
            .flatMap(group => group.items)
            .find(item =>
                item.dropdown?.some(sub => location.pathname.startsWith(sub.path))
            );

        if (currentItem) {
            dispatch({ type: "SET_INITIAL_DROPDOWN", key: currentItem.key });
        }
    }, [location]);

    const memoizedMenuGroups = useMemo(
        () =>
            menuItems.map(group => (
                <React.Fragment key={group.group}>
                    <li className="sidebar-main-title">{group.group}</li>
                    {group.items.map(item => (
                        <SidebarItem
                            key={item.key}
                            item={item}
                            isPinned={state.pinnedItems[item.key]}
                            isActiveDropdown={state.activeDropdown === item.key}
                            onPinToggle={key => dispatch({ type: "TOGGLE_PIN", key })}
                            onDropdownToggle={key => dispatch({ type: "SET_ACTIVE_DROPDOWN", key })}
                        />
                    ))}
                    <li className="line"></li>
                </React.Fragment>
            )),
        [state.pinnedItems, state.activeDropdown]
    );

    return (
        <aside className="page-sidebar" data-sidebar-layout="stroke-svg">
            <div id="sidebar-menu">
                <ul className="sidebar-menu" id="simple-bar">
                    {state.pinnedItems?.length}
                    <li className={`pin-title sidebar-list p-0 ${pinnedItems.length > 0 ? "show" : ""}`}>
                        <h5 className="sidebar-main-title">Pinned</h5>
                    </li>
                    <li className="line pin-line"></li>

                    {memoizedMenuGroups}
                </ul>
            </div>
            <div className="right-arrow" id="right-arrow">
                <svg className="feather">
                    <use href={`${featherSprite}#arrow-right`}></use>
                </svg>
            </div>
        </aside>
    );
};

export default Sidebar;