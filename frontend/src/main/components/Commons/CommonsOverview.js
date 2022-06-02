import React from "react";
import { Card, Col } from "react-bootstrap";

export default function CommonsOverview({ commons }) {
    
    let navigate = useNavigate();
    const leaderboardButtonClick = (id) => { navigate("/leaderboard/" + id) };
    
    return (
        <Card data-testid="CommonsOverview">
            <Card.Header as="h5">Announcements</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                    <Card.Title>Today is day {commons.day}! This game will end on {commons.endDate}.</Card.Title>
                    <Card.Text>Total Players: {commons.totalPlayers}</Card.Text>
                    </Col>
                    <Col>
                    <Button variant="outline-success" buttonLink={leaderboardButtonClick} data-testid={"user-leaderboard-button"}>Leaderboard</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}; 