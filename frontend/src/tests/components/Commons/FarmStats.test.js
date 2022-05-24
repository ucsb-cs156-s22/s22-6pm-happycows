import { render, waitFor } from "@testing-library/react";
import FarmStats from "main/components/Commons/FarmStats"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("FarmStats tests", () => {

    test("renders without crashing", () => {
        render(
            <FarmStats userCommons = {userCommonsFixtures.oneUserCommons[0]} />
        );
    });

    test("contains correct content", async () => {
        const {getByText} = render(
            <FarmStats userCommons = {userCommonsFixtures.oneUserCommons[0]} />
        );

        await waitFor (() => {
            expect(getByText(/Total Wealth: \$1000/)).toBeInTheDocument();
        }); 

        expect(getByText(/Cow Health: 98%/)).toBeInTheDocument();

    });
});