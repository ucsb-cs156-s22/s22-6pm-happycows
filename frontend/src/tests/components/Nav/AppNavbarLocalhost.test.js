import { render, waitFor } from "@testing-library/react";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";

describe("AppNavbarLocalhost tests", () => {

    test("renders correctly ", async () => {
        const { getByText } = render(
            <AppNavbarLocalhost />
        );

        await waitFor(() => expect(getByText(/Running on /)).toBeInTheDocument());
    });

});