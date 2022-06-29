import React from "react";
import OurTable from "main/components/OurTable"

const columns = [
    {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
    },
    {
        Header: 'Created',
        accessor: 'createdAt',
    },
    {
        Header: 'Updated',
        accessor: 'updatedAt',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Log',
        id: 'log',
        Cell: (props) => {
            return <pre>{props.cell.value}</pre>;
        },
        accessor: 'log'
    },
];

export default function JobStatusTable({ jobs }) {
    return <OurTable
        data={jobs}
        columns={columns}
        testid={"JobStatusTable"} />;
};