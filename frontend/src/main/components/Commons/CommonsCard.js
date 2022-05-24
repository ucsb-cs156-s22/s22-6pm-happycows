import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const CommonsCard = ({ buttonText, buttonLink, commons }) => {
    return (
        <Card.Body style={
            // Stryker disable next-line all : don't mutation test CSS 
            { fontSize: "20px", borderTop: "1px solid lightgrey" }
        }>
            <Container>
                <Row>
                    <Col sx={4} data-testid="commonsCard-id">{commons.id}</Col>
                    <Col sx={4} data-testid="commonsCard-name">{commons.name}</Col>
                    {buttonText != null &&
                        <Col sm={4}>
                            <Button
                                data-testid={`commonsCard-button-${buttonText}-${commons.id}`}
                                size="sm"
                                className="mx-4"
                                onClick={() => buttonLink(commons.id)} >{buttonText}
                            </Button>
                        </Col>
                    }
                </Row>
            </Container>
        </Card.Body>
    );
};



export default CommonsCard;
