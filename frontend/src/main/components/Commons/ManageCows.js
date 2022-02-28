import React from "react";
import { Card, _Image, Button, Row, Col} from "react-bootstrap";
// import cowHead from "../../../CowHead.png"; 

// add parameters 
const ManageCows = ({userCommons, onBuy, onSell}) =>  {
    // update cowPrice from fixture
    return (
        <Card>
        <Card.Header as="h5">Manage Cows</Card.Header>
        <Card.Body>
            {/* change $10 to info from fixture */}
            <Card.Title>Market Cow Price: ${userCommons?.commons?.cowPrice}</Card.Title>
           
                <Row>
                    <Col>
                        <Card.Text>
                            [ADD PIC HERE] 
                        </Card.Text>
                    </Col>
                    <Col>
                        <Button variant="outline-danger" onClick={()=>{onBuy(userCommons)}} data-testid={"buy-cow-button"}>+</Button>
                        <br/>
                        <br/>
                        <Button variant="outline-danger" onClick={()=>{onSell(userCommons)}} data-testid={"sell-cow-button"}>-</Button>
                        <br/>
                        <br/>
                    </Col>
                </Row>
          
                    Note: If you increase cows, they will be automatically bought, and if you decrease, 
                    the cows will be sold for the current cow price, time the health of that cow (as a percentage). 
        
        </Card.Body>
        </Card>
    ); 
}; 

export default ManageCows; 