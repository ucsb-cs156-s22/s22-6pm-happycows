import React from "react";
import OurTable from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/commonsUtils"
import { useNavigate } from "react-router-dom";

export default function CommonsTable({ commons }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/commons/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/commons/all"]
    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data

        },
        {
            Header:'Name',
            accessor: 'name',
        },
        {
            Header:'Cow Price',
            accessor: row => String(row.cowPrice),
            id: 'cowPrice'
        },
        {
            Header:'Milk Price',
            accessor: row => String(row.milkPrice),
            id: 'milkPrice'
        },
        {
            Header:'Starting Balance',
            accessor: row => String(row.startingBalance),
            id: 'startingBalance'
        },
        {
            Header:'Starting Date',
            //accessor: row => row.startingDate.toString(),
            accessor: row => String(row.startingDate),
            id: 'startingDate'
        }
    ];

    return <OurTable
        data={commons}
        columns={columns}
        testid={"CommonsTable"}
    />;
};
