import React from "react";
import iconlySprite from "assets/svg/iconly-sprite.svg"; // Update the path according to your project structure
import { Link } from "react-router-dom";

const PageTitle = ({ title, paths }) => (
    <div className="container-fluid">
        <div className="row page-title">
            <div className="col-sm-6">
                <h3>{title}</h3>
            </div>
            <div className="col-sm-6">
                <nav>
                    <ol className="breadcrumb justify-content-sm-end align-items-center">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <svg className="svg-color">
                                    <use href={`${iconlySprite}#Home`} />
                                </svg>
                            </Link>
                        </li>
                        {paths?.length > 0 && (
                            paths.map((item, i) => (
                                <li
                                    key={i} // Adding a unique key to each list item
                                    className={`breadcrumb-item ${paths.length - 1 === i ? 'active' : ''}`}
                                >
                                    {item}
                                </li>
                            ))
                        )}

                    </ol>
                </nav>
            </div>
        </div>
    </div>
);

export default PageTitle;
