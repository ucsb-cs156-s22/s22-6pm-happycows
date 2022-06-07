import React from "react";
import {  Row, Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CommonsOverview({ commons }) {
    
    let navigate = useNavigate();
    // Stryker disable next-line all
    const leaderboardButtonClick = () => { navigate("/leaderboard/" + commons.id) };

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
                        <Button variant="outline-success" data-testid="user-leaderboard-button" onClick={leaderboardButtonClick}>Leaderboard</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}; 