import React from "react";
import CommonsCard from "./CommonsCard";
import { Card, Container, Row, Col } from "react-bootstrap";

const CommonsList = (props) => {
    return(
        <Card style={{opacity:".9"}} className="my-3 border-0">
            <Card.Title data-testid="commonsList-title" style={{fontSize:"35px"}} className="text-center my-3">{props.title}</Card.Title>
            <Card.Subtitle>
                <Container>
                    <Row>
                        <Col data-testid="commonsList-subtitle-id" sx={4}>ID#</Col>
                        <Col data-testid="commonsList-subtitle-name" sx={4}>Common's Name</Col>
                        <Col sm={4}></Col>
                    </Row>
                </Container>
            </Card.Subtitle>
            {props.commonList && props.commonList.map((c)=>(<CommonsCard key={c.id}  commons={c} buttonText={props.buttonText} buttonLink={props.buttonLink}/>)) }
        </Card>
    );
};

export default CommonsList;