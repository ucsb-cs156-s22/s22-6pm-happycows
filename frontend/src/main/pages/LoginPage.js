import React, { useState, useEffect } from "react"
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Background from './../../assets/HomePageBackground.jpg';

import { useBackend } from "main/utils/useBackend";

const LoginCard = () => {
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title data-testid="loginPage-cardTitle">Welcome to Happier Cows!</Card.Title>
            <Card.Text>
            In order to start playing, please login.
            </Card.Text>
            <Button href="/oauth2/authorization/google" variant="primary">Log In</Button>
        </Card.Body>
        </Card>
    )
}

export default function LoginPage() {
    const { data: commons, error: commonsError, status: commonsStatus } = 
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/commons/all"],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: "/api/commons/all"
      },
      []
    );

    var listCommons = commons;
    if(commons.length > 5){
        listCommons = commons.slice(0, 5);
        listCommons.push({id: "...", name: "..."});
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
          <BasicLayout>
            <Container style={{ marginTop: "8%" }}>
              <Row style={{ alignItems: "center", justifyContent: "center"}}>
                <Col sm="auto"><LoginCard/></Col>
                <Col sm="5"><CommonsList title="Available Commons" commonList={ listCommons } buttonText={null} buttonLink={null} /></Col>
              </Row>
            </Container>
          </BasicLayout>
        </div>
    )
}
