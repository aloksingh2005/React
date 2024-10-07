// src/components/Sidebar/SidebarItem.js

import React from "react";
import { NavLink } from "react-router-dom";
import featherSprite from "assets/svg/feather-icons/dist/feather-sprite.svg";
import iconlySprite from "assets/svg/iconly-sprite.svg";

const SidebarItem = ({ item, isPinned, isActiveDropdown, onPinToggle, onDropdownToggle }) => (
    <li
        className={`sidebar-list ${isPinned ? "pined" : ""} ${isActiveDropdown ? "active" : ""
            }`}
    >
        <svg className="pinned-icon" onClick={() => onPinToggle(item.key)}>
            <use href={`${iconlySprite}#Pin`}></use>
        </svg>
        {item.path ? (
            <NavLink className="sidebar-link" to={item.path} exact>
                <svg className="stroke-icon">
                    <use href={item.icon}></use>
                </svg>
                <span>{item.label}</span>
                {item.badge && (
                    <div className="badge badge-primary rounded-pill">
                        {item.badge}
                    </div>
                )}
            </NavLink>
        ) : (
            <>
                <a className="sidebar-link" href="#!" onClick={() => onDropdownToggle(item.key)}>
                    <svg className="stroke-icon">
                        <use href={item.icon}></use>
                    </svg>
                    <span>{item.label}</span>
                    <svg className="feather">
                        <use
                            href={`${featherSprite}#chevron-${isActiveDropdown ? "down" : "right"
                                }`}
                        ></use>
                    </svg>
                </a>
                <ul className={`sidebar-submenu ${isActiveDropdown ? "d-block" : "d-none"}`}>
                    {item.dropdown?.map((subItem) => (
                        <li key={subItem.path}>
                            <NavLink to={subItem.path} activeClassName="active" exact>
                                <svg className="svg-menu">
                                    <use href={`${iconlySprite}#right-3`}></use>
                                </svg>
                                {subItem.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </li>
);

export default SidebarItem;
