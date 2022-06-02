import { fireEvent, render, screen } from "@testing-library/react";
import _mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import LeaderboardPage from "main/pages/LeaderboardPage";
import commonsFixtures from "fixtures/commonsFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("LeaderboardPage tests", () => {
    
    const axiosMock = new AxiosMockAdapter(axios);

    const _testId = "Leaderboard";

    const setupUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdmin = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for users", () => {
        setupUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/all").reply(200, []);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders without crashing for admin", () => {
        setupAdmin();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders one leaderboard without crashing for admin", async () => {
        setupAdmin();
        const queryClient = new QueryClient();
        //apiCurrentUserFixtures.userOnly.user.commons = commonsFixtures.oneCommons;
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/all").reply(200, commonsFixtures.oneCommons);
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1")});
        expect(await screen.findByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Anika's Commons");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-day`)).toHaveTextContent("5");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-startingDate`)).toHaveTextContent("2025-03-05T15:50:10");
    });

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/commons", { params: { id: 1 } }).reply(200, {
            "id": 1,
            "name": "Anika's Commons",
            "day": 5,
            "startingDate": "2026-03-05T15:50:10",
            "endDate": "2027-03-05T15:50:10",
            "startingBalance": 200.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
        });
    });

    

});