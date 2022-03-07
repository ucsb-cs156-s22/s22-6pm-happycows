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
            <Button href="/oauth2/authorization/google" variant="primary">Login</Button>
        </Card.Body>
        </Card>
    )
}

export default function LoginPage() {
    var [commons, setCommons] = useState([]);

    const commonsFromBackend =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/commons/all"],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: "/api/commons/all"
      },
      []
    ).data;

    useEffect(
        () => {
          if (commonsFromBackend) {
            setCommons(commonsFromBackend);
          }
        }, [commonsFromBackend]
    );

    if(commons.length > 5){
        commons = commons.slice(0, 5);
        commons.push({id: "...", name: "..."});
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
          <BasicLayout>
            {//<h1 data-testid="loginPage-title" style={{ fontSize: "40px", borderRadius: "7px", backgroundColor: "white", opacity: ".9" }} className="text-center border-0 my-3">Welcome to Happier Cows!</h1>
            }
            <Container style={{ marginTop: "8%" }}>
                {//We need these overrides, stylistic stuff.
                }
              <Row style={{ alignItems: "center", justifyContent: "center"}}>
                <Col sm="auto"><LoginCard/></Col>
                <Col sm="5"><CommonsList title="Available Commons" commonList={ commons } buttonText={null} buttonLink={null} /></Col>
              </Row>
            </Container>
          </BasicLayout>
        </div>
    )
}
