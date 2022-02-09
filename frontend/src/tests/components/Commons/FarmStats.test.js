import { render } from "@testing-library/react";
import FarmStats from "main/components/Commons/FarmStats"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("FarmStats tests", () => {

    test("renders without crashing", () => {
        render(
            <FarmStats userCommons = {userCommonsFixtures.oneUserCommons[0]} />
        );
    });
});