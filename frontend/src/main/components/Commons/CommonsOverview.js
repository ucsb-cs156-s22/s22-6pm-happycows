import React from "react";
import { _Container, Row, _Router, Card, Col, Button } from "react-bootstrap";
import { _Link, _useNavigate } from "react-router-dom";

export default function CommonsOverview({ commons }) {
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
                    <Button variant="outline-success" href={`/leaderboard/${commons.id}`}>Leaderboard</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}; 