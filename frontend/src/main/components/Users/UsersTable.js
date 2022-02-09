import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const addTestId = (_cell, _row, rowIndex, colIndex) => ({
    "data-testid": `row-${rowIndex}-col-${colIndex}`,
  });

export default function UsersTable({ users }) {

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
            attrs: addTestId
        },
        {
            dataField: "givenName",
            text: "First Name",
            sort: true,
            attrs: addTestId
        },
        {
            dataField: "familyName",
            text: "Last Name",
            sort: true,
            attrs: addTestId
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            attrs: addTestId
        },
        {
            dataField: "admin",
            text: "Admin",
            sort: true,
            attrs: addTestId
        }
    ];

    return <BootstrapTable
        bootstrap4={true}
        keyField="id"
        data={users}
        columns={columns} />;
};