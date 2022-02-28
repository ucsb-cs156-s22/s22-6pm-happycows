import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import AdminUsersPage from "main/pages/AdminUsersPage";
import usersFixtures from "fixtures/usersFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("AdminUsersPage tests",  () => {
    const queryClient = new QueryClient();

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(()=>{
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);

    });

    test("renders without crashing on two users", async () => {

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Users")).toBeInTheDocument());

    });

});


