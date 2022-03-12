import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import React from "react";
import { useCurrentUser } from "main/utils/currentUser";
import CommonsPlay from "main/components/Commons/CommonsPlay";
import { useParams } from "react-router-dom";
import CommonsOverview from "main/components/Commons/CommonsOverview";
import { Container, CardGroup } from "react-bootstrap";
import ManageCows from "main/components/Commons/ManageCows";
import FarmStats from "main/components/Commons/FarmStats";
import Profits from "main/components/Commons/Profits";
import { useBackend } from "main/utils/useBackend";

export default function PlayPage() {

  const { commonsId } = useParams();
  const { data: currentUser } = useCurrentUser();

  const { data: userCommons, error: userCommonsError, status: userCommonsStatus } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: "/api/usercommons/forcurrentuser",
        params: {
          commonsId: commonsId
        }
      }
    );

  const { data: commons, error: commonsError, status: commonsStatus } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/commons?commons_id=${commonsId}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: "/api/commons",
        params: {
          id: commonsId
        }
      }
    );

 
  const onBuy = (userCommons) => { 
    console.log("onBuy called:", userCommons); 
  };
  
  const onSell = (userCommons) => { 
    console.log("onSell called:", userCommons);
  };

  return (
    
    <BasicLayout >
      <Container >
        { !!currentUser &&  <CommonsPlay currentUser={currentUser} /> }
        { !!commons && <CommonsOverview commons={commons} />}
        <br />
        { !!userCommons &&
          <CardGroup >
            <ManageCows userCommons={userCommons} commons={commons} onBuy={onBuy} onSell={onSell} />
            <FarmStats userCommons={userCommons} />
            <Profits userCommons={userCommons} />
          </CardGroup>
        }
      </Container>
    </BasicLayout>
  )
}