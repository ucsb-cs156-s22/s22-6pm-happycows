import { render } from "@testing-library/react";
import Profits from "main/components/Commons/Profits"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 
import profitsFixtures from "fixtures/profitsFixtures";

describe("Profits tests", () => {

    test("renders without crashing for 0 profits", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} profits={[]} />
        );
    });

    test("renders without crashing", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} profits={profitsFixtures.threeProfits} />
        );
    });
});