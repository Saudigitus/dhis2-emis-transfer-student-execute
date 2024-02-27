import { Navigate } from "react-router-dom";
import React from "react";
import { TableComponent } from "../../pages";
import { FullLayout, SimpleLayout } from "../../layout";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/student-transfer" replace />
        },
        {
            path: "/student-transfer",
            layout: FullLayout,
            component: () => <TableComponent />
        }
    ]
}
