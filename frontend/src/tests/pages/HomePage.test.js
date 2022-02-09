import { render } from "@testing-library/react";
import HomePage from "main/pages/HomePage";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import commonsFixtures from "fixtures/commonsFixtures"; 

describe("HomePage tests", () => {
    const queryClient = new QueryClient();
    
    test("renders without crashing when lists return empty list", () => {
        var axiosMock = new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        
        axiosMock.onGet("/api/commons").reply(200, []);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const title = getByTestId("homePage-title");
        expect(title).toBeInTheDocument();
        expect(typeof(title.textContent)).toBe('string');
        expect(title.textContent).toEqual('Howdy Farmer');
    });

    test("renders without crashing when lists are full", () => {
        apiCurrentUserFixtures.userOnly.user.commons = commonsFixtures.oneCommons;
        var axiosMock = new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/commons").reply(200, commonsFixtures.threeCommons);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const title = getByTestId("homePage-title");
        expect(title).toBeInTheDocument();
        expect(typeof(title.textContent)).toBe('string');
        expect(title.textContent).toEqual('Howdy Farmer');
    });
});
