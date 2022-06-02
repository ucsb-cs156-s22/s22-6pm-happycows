import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import AdminCreateCommonsPage from "main/pages/AdminCreateCommonsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockedNavigate(x); return null; }
    };
});

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("AdminCreateCommonsPage tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminCreateCommonsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Create Commons")).toBeInTheDocument();
    });

    test("When you fill in form and click submit, the right things happens", async () => {
        axiosMock.onPost("/api/commons/new").reply(200, {
            "id": 5,
            "name": "My New Commons",
            "cowPrice": 10,
            "milkPrice": 5,
            "startingBalance": 500,
            "startingDate": "2022-03-05T00:00:00",
            totalPlayers:"0"
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminCreateCommonsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Create Commons")).toBeInTheDocument();

        const commonsNameField = screen.getByLabelText("Commons Name");
        const startingBalanceField = screen.getByLabelText("Starting Balance");
        const cowPriceField = screen.getByLabelText("Cow Price");
        const milkPriceField = screen.getByLabelText("Milk Price");
        const startDateField = screen.getByLabelText("Starting Date");
        const button = screen.getByTestId("CommonsForm-Submit-Button");

        fireEvent.change(commonsNameField, { target: { value: 'My New Commons' } })
        fireEvent.change(startingBalanceField, { target: { value: '500' } })
        fireEvent.change(cowPriceField, { target: { value: '10' } })
        fireEvent.change(milkPriceField, { target: { value: '5' } })
        fireEvent.change(startDateField, { target: { value: '2022-03-05' } })
        fireEvent.click(button);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        // The Date object is initialized from the form without time information. I believe React
        // Query calls toISOString() before stuffing it into the body of the POST request, so the
        // POST contains the suffix .000Z, which Java's LocalDateTime.parse ignores. [1]

        const expectedCommons = {
            name: "My New Commons",
            startingBalance: 500,
            cowPrice: 10,
            milkPrice: 5,
            startingDate: '2022-03-05T00:00:00.000Z' // [1]
        };

        expect(axiosMock.history.post[0].data).toEqual( JSON.stringify(expectedCommons) );

        expect(mockToast).toBeCalledWith("Commons successfully created! - id: 5 name: My New Commons startDate: 2022-03-05T00:00:00 cowPrice: 10");
        // expect(mockNavigate).toBeCalledWith({ "to": "/admin/listcommons" });
    });
});
