import React from "react";
//import { Container, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
//import { toast } from "react-toastify";

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
//import CommonsOverview from "main/components/Commons/CommonsOverview";
//import CommonsPlay from "main/components/Commons/CommonsPlay";
//import FarmStats from "main/components/Commons/FarmStats";
//import ManageCows from "main/components/Commons/ManageCows";
//import Profits from "main/components/Commons/Profits";
//import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useBackend } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from "../../assets/PlayPageBackground.png";

export default function LeaderboardPage() {

  const { commonsId } = useParams();
  const { data: currentUser } = useCurrentUser();

  // Stryker disable all 
  const { data: userCommons, error: _error, status: _status } =
    useBackend(
      [`/api/usercommons/commons/all?commonsId=${commonsId}`],
      {
        method: "GET",
        url: "/api/usercommons/commons/all",
        params: {
          commonsId: commonsId
        }
      },
      []
    );
  // Stryker enable all 

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
        <BasicLayout>
            <div className="pt-2">
                <h1>Leaderboard</h1>
                <LeaderboardTable leaderboardUsers={userCommons} currentUser={currentUser} />
            </div>
        </BasicLayout>
    </div>
  )
}