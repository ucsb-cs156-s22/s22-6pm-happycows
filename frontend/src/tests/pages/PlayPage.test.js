import { fireEvent, render, waitFor } from "@testing-library/react";
import PlayPage from "main/pages/PlayPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        commonsId: 1
    })
}));

describe("PlayPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/usercommons/forcurrentuser", { params: { commonsId: 1 } }).reply(200, {
            commonsId: 1,
            id: 1,
            totalWealth: 0,
            userId: 1
        });
        axiosMock.onGet("/api/commons", { params: { id: 1 } }).reply(200, {
            id: 1,
            name: "Sample Commons"
        });
        axiosMock.onGet("/api/commons/all").reply(200, [
            {
                id: 1,
                name: "Sample Commons"
            }
        ]);
    });

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("click buy and sell buttons", async () => {

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("buy-cow-button")).toBeInTheDocument());
        const buyCowButton = getByTestId("buy-cow-button");
        fireEvent.click(buyCowButton);

        const sellCowButton = getByTestId("sell-cow-button");
        fireEvent.click(sellCowButton);

    });

    test("Make sure that both the Announcements and Welcome Farmer components show up", async () => {

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( ()=>expect(getByText(/Announcements/)).toBeInTheDocument());
        await waitFor( ()=>expect(getByText(/Welcome Farmer/)).toBeInTheDocument());
    });

});


