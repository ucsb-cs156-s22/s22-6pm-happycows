// import OurTable, { ButtonColumn } from "main/components/OurTable";
import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/commonsUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

// should take in a players list from a commons
export default function LeaderboardTable({ leaderboardUsers , currentUser }) {

    const columns = [
        {
            Header: 'User Id',
            accessor: 'user.id', 
        },
        {
            Header: 'Total Wealth',
            accessor: 'totalWealth',
        },
        {
            Header: 'Cows Owned',
            accessor: 'numOfCows', 
        },
        {
            Header: 'Cow Health',
            accessor: 'cowHealth', 
        }
    ];

    const testid = "LeaderboardTable";

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        // ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={leaderboardUsers}
        columns={columnsToDisplay}
        testid={testid}
    />;
};