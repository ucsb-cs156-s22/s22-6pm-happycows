import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ProfilePage from "main/pages/ProfilePage";

describe("ProfilePage tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        var axiosMock = new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phillip Conrad")).toBeInTheDocument() );
        expect(getByText("pconrad.cis@gmail.com")).toBeInTheDocument();
    });

    test("renders correctly for admin user", async () => {

        var axiosMock = new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phill Conrad")).toBeInTheDocument() );
        expect(getByText("phtcon@ucsb.edu")).toBeInTheDocument();
        expect(getByTestId("role-badge-user")).toBeInTheDocument();
        expect(getByTestId("role-badge-admin")).toBeInTheDocument();
        expect(getByTestId("role-badge-member")).toBeInTheDocument();
    });
});


