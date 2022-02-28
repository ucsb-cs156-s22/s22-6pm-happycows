import { render } from "@testing-library/react";
import CommonsOverview from "main/components/Commons/CommonsOverview"; 
import commonsFixtures from "fixtures/commonsFixtures"; 

describe("CommonsOverview tests", () => {

    test("renders without crashing", () => {
        render(
            <CommonsOverview commons={commonsFixtures.oneCommons[0]} />
        );
    });
});