import { render } from "@testing-library/react";
import {currentUserFixtures} from "fixtures/currentUserFixtures";
import CommonsPlay from "main/components/Commons/CommonsPlay"; 
import commonsFixtures from "fixtures/commonsFixtures"; 

describe("CommonsPlay tests", () => {

    test("renders without crashing when user is userOnly", () => {
        render(
            <CommonsPlay currentUser={currentUserFixtures.userOnly } commons={commonsFixtures.oneCommons[0]} />
        );
    });

    test("renders without crashing when user is admin", () => {
        render(
            <CommonsPlay currentUser={currentUserFixtures.adminUser } commons={commonsFixtures.oneCommons[0]} />
        );
    });

    test("renders without crashing when currentUser.root is undefined", () => {
        render(
            <CommonsPlay currentUser={currentUserFixtures.noRoot } commons={commonsFixtures.oneCommons[0]} />
        );
    });
});