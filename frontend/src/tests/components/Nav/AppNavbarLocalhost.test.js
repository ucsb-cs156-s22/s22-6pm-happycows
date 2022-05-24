import { render, screen } from "@testing-library/react";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";

describe("AppNavbarLocalhost tests", () => {
    test("renders correctly", async () => {
        render(
            <AppNavbarLocalhost />
        );

        expect(await screen.findByText(/Running on /)).toBeInTheDocument();
    });
});
