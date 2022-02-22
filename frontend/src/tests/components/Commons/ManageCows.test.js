import { render } from "@testing-library/react";
import ManageCows from "main/components/Commons/ManageCows"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("ManageCows tests", () => {

    test("renders without crashing", () => {
        render(
            <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={(userCommons) => { console.log("onBuy called:",userCommons); }} onSell={ (userCommons) => { console.log("onSell called:",userCommons); }} />
        );
    });

    // test("buying and selling a cow", () => {
    //     const mockBuy = jest.fn();
    //     const mockSell = jest.fn();

    //     render(
    //         <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={mockBuy} onSell={mockSell} />
    //     );

    //     const buyButton = getByTestId("buy-cow-button");
    //     const sellButton = getByTestId("sell-cow-button");
    //     button.find('button').simulate('click');
    //     expect(mockBuy.mock.calls.length).toEqual(1);
    // });

    // test("sell a cow", () => {
    //     render(
    //         <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={(userCommons) => { console.log("onBuy called:",userCommons); }} onSell={ (userCommons) => { console.log("onSell called:",userCommons); }} />
    //     );

    // });
});