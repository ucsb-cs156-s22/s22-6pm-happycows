import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import SwaggerPage from "main/pages/SwaggerPage";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";

describe("SwaggerPage tests", () => {
    const queryClient = new QueryClient();
    test("renders without crashing", () => {

        var axiosMock = new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <SwaggerPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

   
});


