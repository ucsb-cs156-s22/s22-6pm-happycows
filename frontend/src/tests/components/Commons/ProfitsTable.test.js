import { render, screen, waitFor } from "@testing-library/react";
import ProfitsTable from "main/components/Commons/ProfitsTable";
import profitsTableFixtures from "fixtures/profitsTableFixtures";

describe("ProfitsTable tests", () => {
    test("renders without crashing for 0 profits", () => {
        render(
            <ProfitsTable profits={[]} />
        );
    });

    test("renders without crashing", async () => {
        render(
            <ProfitsTable profits={profitsTableFixtures.threeTableProfits} />
        );
        await waitFor(()=>{
            expect(screen.getByTestId("ProfitsTable-header-profit") ).toBeInTheDocument();
        });

        const expectedHeaders = [ "Profit", "Date"];
    
        expectedHeaders.forEach((headerText) => {
          const header = screen.getByText(headerText);
          expect(header).toBeInTheDocument();
        });

    });
});