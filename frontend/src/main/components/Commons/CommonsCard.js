import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const CommonsCard = (props) => {
    return(
        <Card.Body style={{fontSize:"20px", borderTop:"1px solid lightgrey"}}>
            <Container>
                <Row>
                    <Col sx={4} data-testid="commonsCard-id">{props.commons.id}</Col>
                    <Col sx={4} data-testid="commonsCard-name">{props.commons.name}</Col>
                    {props.buttonText != null && <Col sm={4}><Button data-testid={`commonsCard-button-${props.buttonText}-${props.commons.id}`} variant={'danger'} size="sm" className="mx-4" onClick={() => props.buttonLink(props.commons.id)} >{props.buttonText}</Button></Col>}
                </Row>
            </Container>
        </Card.Body>
    );
};



export default CommonsCard;
