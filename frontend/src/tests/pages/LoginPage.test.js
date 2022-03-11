import { fireEvent, render, waitFor } from "@testing-library/react";
import LoginPage from "main/pages/LoginPage";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import commonsFixtures from "fixtures/commonsFixtures";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { getAllByTestId } from "@testing-library/dom";

describe("LoginPage tests", () => {
    const queryClient = new QueryClient();
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing when lists return empty list", () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/all").reply(200, []);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const title = getByTestId("loginPage-cardTitle");
        expect(title).toBeInTheDocument();
        expect(typeof (title.textContent)).toBe('string');
        expect(title.textContent).toEqual('Welcome to Happier Cows!');
    });

    test("renders only a max of 6 elements in the list, despite there being 7 commons.", async () => {
        apiCurrentUserFixtures.userOnly.user.commons = commonsFixtures.sevenCommons;
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons/all").reply(200, commonsFixtures.sevenCommons);
        const { findAllByTestId, getAllByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await findAllByTestId("commonsCard-id");

        const cards = getAllByTestId("commonsCard-name");

        expect(cards.length).toEqual(6);
    });
});
