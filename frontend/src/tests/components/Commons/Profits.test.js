import { render, screen, waitFor } from "@testing-library/react";
import Profits from "main/components/Commons/Profits"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 
import profitsFixtures from "fixtures/profitsFixtures";

describe("Profits tests", () => {
    test("renders properly for empty profits array", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} profits={[]} />
        );
    });

    test("renders properly when profits is not defined", async () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]}  />
        );
        await waitFor(()=>{
            expect(screen.getByTestId("ProfitsTable-header-profit") ).toBeInTheDocument();
        });
    });

    test("renders properly when profits is non-empty", async () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} profits={profitsFixtures.threeProfits} />
        );
           
        expect(await screen.findByTestId("ProfitsTable-cell-row-0-col-profit")).toBeInTheDocument();
        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-profit")).toHaveTextContent(/10/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-profit")).toHaveTextContent(/20/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-profit")).toHaveTextContent(/30/);

        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-date")).toHaveTextContent(/2022-05-24/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-date")).toHaveTextContent(/2023-01-10/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-date")).toHaveTextContent(/2022-05-27/);
    });
});
