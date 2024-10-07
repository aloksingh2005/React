// RouteResource.js
import React from 'react';
import { Route } from 'react-router-dom';

function RouteResource({ path, list, create, edit, detail }) {
    return [
        <Route key={`${path}-list`} exact path={path} element={list} />,
        <Route key={`${path}-create`} exact path={`${path}/create`} element={create} />,
        <Route key={`${path}-edit`} exact path={`${path}/edit/:id`} element={edit} />,
        detail && <Route key={`${path}-detail`} exact path={`${path}/:id`} element={detail} />,
    ].filter(Boolean); // filter to remove any `undefined` elements
}

export default RouteResource;
