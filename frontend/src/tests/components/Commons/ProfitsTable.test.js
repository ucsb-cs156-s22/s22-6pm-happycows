import { render, waitFor } from "@testing-library/react";
import ProfitsTable from "main/components/Commons/ProfitsTable";
import profitsTableFixtures from "fixtures/profitsTableFixtures";

describe("ProfitsTable tests", () => {

    test("renders without crashing for 0 profits", () => {
        render(
            <ProfitsTable profits={[]} />
        );
    });

    test("renders without crashing", async () => {
        const {getByTestId, getByText}  = render(
            <ProfitsTable profits={profitsTableFixtures.threeTableProfits} />
        );
        await waitFor(()=>{
            expect( getByTestId("ProfitsTable-header-profit") ).toBeInTheDocument();
        });

        const expectedHeaders = [ "Profit", "Date"];
        const testId = "ProfitsTable";
    
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

    });
});