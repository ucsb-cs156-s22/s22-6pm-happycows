import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import CommonsOverview from "main/components/Commons/CommonsOverview"; 
import PlayPage from "main/pages/PlayPage";
import commonsFixtures from "fixtures/commonsFixtures"; 
import leaderboardFixtures from "fixtures/leaderboardFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        commonsId: 1
    })
}));

describe("CommonsOverview tests", () => {

    const queryClient = new QueryClient();
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        render(
            <CommonsOverview commons={commonsFixtures.oneCommons[0]} />
        );
    });

    test("Redirects to the LeaderboardPage when you click visit", async () => {
        apiCurrentUserFixtures.userOnly.user.commons = commonsFixtures.oneCommons;
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons", {params: {commons_id:1}}).reply(200, commonsFixtures.oneCommons);
        axiosMock.onGet("/api/leaderboard/all").reply(200, leaderboardFixtures.threeUserCommonsLB);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId("user-leaderboard-button")).toBeInTheDocument();
        const joinButton = screen.getByTestId("user-leaderboard-button");
        fireEvent.click(joinButton);
    });
});