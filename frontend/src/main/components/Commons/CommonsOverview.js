import React from "react";
import { _Container, Row, _Router, Card, Col, Button } from "react-bootstrap";
import { _Link, useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function CommonsOverview({ commons, currentUser }) {

    let navigate = useNavigate();
    // Stryker disable next-line all
    const leaderboardButtonClick = () => { navigate("/leaderboard/" + commons.id) };
    const showLeaderboard = (hasRole(currentUser, "ROLE_ADMIN") || commons.showLeaderboard );
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
                        {showLeaderboard &&
                        (<Button variant="outline-success" data-testid="user-leaderboard-button" onClick={leaderboardButtonClick}>
                            Leaderboard
                        </Button>)}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}; 