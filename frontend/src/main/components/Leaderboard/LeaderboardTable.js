import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";

// should take in a players list from a commons
export default function LeaderboardTable({ leaderboardUsers , currentUser }) {

    const columns = [
        {
            Header: 'Player Name',
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
            accessor: 'leaderboardUsers[0].cowHeath'
        }
    ];

    const testid = "LeaderboardTable";

    /* Temp filler for admin leaderboard table */

    const columnsIfAdmin = [
        {
            Header: '(Admin) UserCommons Id',
            accessor: 'id'
        },
        ...columns
        
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={leaderboardUsers}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
