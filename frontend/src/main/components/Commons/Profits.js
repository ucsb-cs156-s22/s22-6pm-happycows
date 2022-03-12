import React from "react";
import { Card } from "react-bootstrap";
import ProfitsTable from "main/components/Commons/ProfitsTable";


function timestampToDate(timestamp) {
    function padWithZero(n) { return n < 10 ? '0' + n : n; }
    var date = new Date(timestamp);
    return (date.getFullYear() + "-" + (padWithZero(date.getMonth()+1)) + "-" + padWithZero(date.getDate()));
}

const Profits = ({userCommons, profits}) => {
    const profitsForTable = profits && profits.map(profit => ({
        date: timestampToDate(profit.timestamp),
        ...profit
    }));
    return (
        <Card>
            <Card.Header as="h5">Profits</Card.Header>
            <Card.Body>
                {/* change 4am to admin-appointed time? And consider adding milk bottle as decoration */}
                <Card.Title>You will earn profits from milking your cows everyday at 4am.</Card.Title>
                {profitsForTable && <ProfitsTable profits={profitsForTable} />}
            </Card.Body>
        </Card>
    );
};

export default Profits;