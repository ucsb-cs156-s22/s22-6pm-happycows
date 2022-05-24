import React from "react";
import { Card } from "react-bootstrap";
import ProfitsTable from "main/components/Commons/ProfitsTable";

import { timestampToDate } from "main/utils/dateUtils";


const Profits = ({ userCommons, profits }) => {
    const profitsForTable =
        profits ?
        profits.map(profit => ({
            date: timestampToDate(profit.timestamp),
            ...profit
        })) : 
        // Stryker disable next-line ArrayDeclaration : no need to test what happens if [] is replaced with ["Stryker was here"]
        [];
    return (
        <Card>
            <Card.Header as="h5">
                Profits
            </Card.Header>
            <Card.Body>
                {/* change 4am to admin-appointed time? And consider adding milk bottle as decoration */}
                <Card.Title>
                    You will earn profits from milking your cows everyday at 4am.
                </Card.Title>
                {
                    <ProfitsTable profits={profitsForTable} />
                }
            </Card.Body>
        </Card>
    );
};

export default Profits;