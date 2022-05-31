import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import LeaderboardTable from 'main/components/Leaderboard/LeaderboardTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook
export default function LeaderboardPage() {
    
    // this will use the argument from the address
    // this will act as the commons id
    // let { id } = useParams();
  const currentUser = useCurrentUser();
  // this backend should use the get api for a specific commons to get all its users
  const { data: leaderboardUsers, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      // this api will call leaderboard for a specific commons, using above arg and then get all students
      ["/api/MenuItemReview/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/MenuItemReview/all" },
      []
    );
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1> -insert commons name- Commons Leaderboard</h1>
        <LeaderboardTable leaderboardUsers={leaderboardUsers} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}