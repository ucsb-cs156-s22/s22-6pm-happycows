import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import AdminUsersPage from "main/pages/AdminUsersPage";
import usersFixtures from "fixtures/usersFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import nock from "nock";

describe("AdminUsersPage tests",  () => {
    const queryClient = new QueryClient();
    test("renders without crashing on two users", async () => {

        const _expectation1 = nock('http://localhost')
        .get('/api/currentUser')
        .reply(200, apiCurrentUserFixtures.adminUser);

        const _expectation2 = nock('http://localhost')
            .get('/api/admin/users')
            .reply(200, usersFixtures.threeUsers);

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


