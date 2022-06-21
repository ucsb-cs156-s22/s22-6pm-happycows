import { screen, waitFor, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import LeaderboardPage from "main/pages/LeaderboardPage";

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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            commonsId: 1
        }),
        useNavigate: () => mockNavigate
    };
});

describe("LeaderboardPage tests", () => {
    
    const axiosMock = new AxiosMockAdapter(axios);

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
        axiosMock.onGet("/api/usercommons/commons/all", { params: { commonsId: 1} }).reply(200,[]);
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders leaderboard for users when showLeaderboard = true", async () => {
        setupUser();
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
        axiosMock.onGet("/api/usercommons/commons/all", { params: { commonsId: 1} }).reply(200,[]);
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(axiosMock.history.get.length).toEqual(4);
        });
        expect(await screen.findByText("Total Wealth")).toBeInTheDocument();
    });

    test("renders leaderboard error message for users when showLeaderboard = false", async () => {
        setupUser();
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
            "showLeaderboard": false,
        });
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(await screen.findByText("You're not authorized to see the leaderboard.")).toBeInTheDocument();
    });

    test("renders without crashing for admin", () => {
        setupAdmin();
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });


});