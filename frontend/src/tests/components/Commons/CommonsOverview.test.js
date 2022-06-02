import { _fireEvent, render, _screen } from "@testing-library/react";
import { _QueryClient, _QueryClientProvider } from "react-query";
import { _MemoryRouter } from "react-router-dom";
// import axios from "axios";
// import AxiosMockAdapter from "axios-mock-adapter";

import CommonsOverview from "main/components/Commons/CommonsOverview"; 
// import PlayPage from "main/pages/PlayPage";
import commonsFixtures from "fixtures/commonsFixtures"; 
// import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
// import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("CommonsOverview tests", () => {

    // const queryClient = new QueryClient();
    // const axiosMock = new AxiosMockAdapter(axios);

    // beforeEach(() => {
    //     axiosMock.reset();
    //     axiosMock.resetHistory();
    //     axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    // });

    test("renders without crashing", () => {
        render(
            <CommonsOverview commons={commonsFixtures.oneCommons[0]} />
        );
    });
});