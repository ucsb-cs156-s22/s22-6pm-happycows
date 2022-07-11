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
        ["/api/commons/allplus"]
    );
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const leaderboardCallback = (cell) => {
        navigate(`/leaderboard/${cell.row.values.id}`)
    }

    const columns = [
        {
            Header: 'id',
            accessor: 'commons.id', // accessor is the "key" in the data

        },
        {
            Header:'Name',
            accessor: 'commons.name',
        },
        {
            Header:'Cow Price',
            accessor: row => String(row.commons.cowPrice),
            id: 'cowPrice'
        },
        {
            Header:'Milk Price',
            accessor: row => String(row.commons.milkPrice),
            id: 'milkPrice'
        },
        {
            Header:'Starting Balance',
            accessor: row => String(row.commons.startingBalance),
            id: 'startingBalance'
        },
        {
            Header:'Starting Date',
            accessor: row => String(row.commons.startingDate).slice(0,10),
            id: 'startingDate'
        },
        {
            Header:'Degradation Rate',
            //accessor: row => row.startingDate.toString(),
            accessor: row => String(row.commons.degradationRate),
            id: 'degradationRate'
        },
        {
            Header:'Show Leaderboard?',
            id: 'showLeaderboard', // needed for tests
            accessor: (row, _rowIndex) => String(row.commons.showLeaderboard) // hack needed for boolean values to show up
        },
        {
            Header: 'Cows',
            accessor: 'totalCows'
        }
    ];

    const testid = "CommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid),
        ButtonColumn("Leaderboard", "secondary", leaderboardCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={commons}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
