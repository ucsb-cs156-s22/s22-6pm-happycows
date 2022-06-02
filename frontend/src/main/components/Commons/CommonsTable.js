import React from "react";
import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/commonsUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function CommonsTable({ commons, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/admin/editcommons/${cell.row.values.id}`)
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
        },
        {
            Header:'Degradation Rate',
            //accessor: row => row.startingDate.toString(),
            accessor: row => String(row.degradationRate),
            id: 'degradationRate'
        }
    ];

    const testid = "CommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    
    return <OurTable
        data={commons}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
