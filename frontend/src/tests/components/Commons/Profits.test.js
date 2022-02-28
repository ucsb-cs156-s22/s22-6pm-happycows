import { render } from "@testing-library/react";
import Profits from "main/components/Commons/Profits"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("Profits tests", () => {

    test("renders without crashing", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} />
        );
    });
});