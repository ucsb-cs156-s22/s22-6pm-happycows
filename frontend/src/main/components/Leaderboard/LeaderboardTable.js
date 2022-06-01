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
            Header: 'Full Name',
            accessor: 'user.fullName', 
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

    /* Bring back 34-38 once admin has unique leaderboard page */

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, testid),
    //     // ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];


    // *this line below is ommited sice currently admin and user view the same table and will make mutation testing difficult*
    // *once admin and user differ, then uncomment this line

    //  const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    
    const columnsToDisplay = columns;

    return <OurTable
        data={leaderboardUsers}
        columns={columnsToDisplay}
        testid={testid}
    />;
};