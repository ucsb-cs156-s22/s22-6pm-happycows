import { render } from "@testing-library/react";
import ManageCows from "main/components/Commons/ManageCows"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("ManageCows tests", () => {

    test("renders without crashing", () => {
        render(
            <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={(userCommons) => { console.log("onBuy called:",userCommons); }} onSell={ (userCommons) => { console.log("onSell called:",userCommons); }} />
        );
    });
});