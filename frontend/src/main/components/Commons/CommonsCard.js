import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const CommonsCard = ({ buttonText, buttonLink, commons }) => {
  const MILLISECONDSPERDAY = 86400000;
  const currDate = new Date();
  const endDate = new Date(commons.endDate);
  const daysLeft = Math.floor((endDate.getTime() - currDate.getTime()) / MILLISECONDSPERDAY);
  // endDate.getTime() is 0 when the end date isn't set
  const daysLeftText = endDate.getTime() === 0 ? "Not set" : "Finished";

    return (
        <Card.Body style={
            // Stryker disable next-line all : don't mutation test CSS
            { fontSize: "20px", borderTop: "1px solid lightgrey" }
        }>
            <Container>
                <Row>
                    <Col sx={4} data-testid="commonsCard-id">{commons.id}</Col>
                    <Col sx={4} data-testid="commonsCard-name">{commons.name}</Col>
                    // Stryker disable next-line all : don't care about a 1ms difference
                    <Col sx={4} data-testid="commonsCard-endDate">{daysLeft >= 0 ? daysLeft : daysLeftText}</Col>
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
