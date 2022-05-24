import { render, screen } from "@testing-library/react";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import RoleBadge from "main/components/Profile/RoleBadge"

describe("RoleBadge tests", () => {
    test("renders without crashing for ROLE_USER when user has ROLE_USER", async () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.userOnly} role={"ROLE_USER"} />
        );
        expect(await screen.findByTestId("role-badge-user")).toBeInTheDocument();
    });

    test("renders without crashing for ROLE_ADMIN when user has ROLE_ADMIN", async () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.adminUser} role={"ROLE_ADMIN"} />
        );
        expect(await screen.findByTestId("role-badge-admin")).toBeInTheDocument();
    });

    test("renders without crashing for ROLE_ADMIN when user does NOT have ROLE_ADMIN", async () => {
        render(
            <RoleBadge currentUser={currentUserFixtures.userOnly} role={"ROLE_ADMIN"} />
        );
        expect(await screen.findByTestId("role-missing-admin")).toBeInTheDocument();
    });
});
