import { render } from "@testing-library/react";
import ProfitsTable from "main/components/Commons/ProfitsTable";
import profitsTableFixtures from "fixtures/profitsTableFixtures";

describe("ProfitsTable tests", () => {

    test("renders without crashing for 0 profits", () => {
        render(
            <ProfitsTable profits={[]} />
        );
    });

    test("renders without crashing", () => {
        render(
            <ProfitsTable profits={profitsTableFixtures.threeTableProfits} />
        );
    });
});