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
import userCommonsFixtures from "fixtures/userCommonsFixtures";


export default function PlayPage() {
  let { _commonsId } = useParams();
  const { data: currentUser } = useCurrentUser();

  // const userCommons = ... //TODO: look up the userCommons using the commonsId and the currentUser

  // TEMPORARY:
  const userCommons = userCommonsFixtures.oneUserCommons[0];
  const commons = userCommons.commons;
  
  const onBuy = (userCommons) => { console.log("onBuy called:", userCommons); };
  const onSell = (userCommons) => { console.log("onSell called:", userCommons); };

  return (
    <BasicLayout >
      <Container >
        <CommonsPlay  currentUser={currentUser} />
        <CommonsOverview commons={commons} />
        <br />
        <CardGroup >
          <ManageCows userCommons={userCommons} onBuy={onBuy} onSell={onSell} />
          <FarmStats  userCommons={userCommons} />
          <Profits  userCommons={userCommons} />
        </CardGroup>
      </Container>
    </BasicLayout>
  )
}