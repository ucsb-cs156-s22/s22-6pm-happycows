import { render } from "@testing-library/react";
import PlayPage from "main/pages/PlayPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

describe("PlayPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

});


