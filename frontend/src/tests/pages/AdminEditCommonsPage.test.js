import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import AdminEditCommonsPage from "main/pages/AdminEditCommonsPage";
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
            id: 5
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("AdminEditCommonsPage tests", () => {
    describe("tests where backend is working normally", () => {
        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/commons", { params: { id: 5 } }).reply(200, {
                "id": 5,
                "name": "Seths Common",
                "startingDate": "2022-03-05",
                "startingBalance": 1200,
                "cowPrice": 15,
                "milkPrice": 10,
                "degradationRate": 20.3,
                "showLeaderboard": false,
            });
            axiosMock.onPut('/api/commons/update').reply(200, {
                "id": 5,
                "name": "Phill's Commons",
                "startingDate": "2022-03-07",
                "startingBalance": 1400,
                "cowPrice": 200,
                "milkPrice": 5,
                "degradationRate": 40.3,
                "showLeaderboard": false,
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <AdminEditCommonsPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <AdminEditCommonsPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            expect(await screen.findByLabelText(/Commons Name/)).toBeInTheDocument();

            const nameField = screen.getByLabelText(/Commons Name/);
            const startingBalanceField = screen.getByLabelText(/Starting Balance/);
            const cowPriceField = screen.getByLabelText(/Cow Price/);
            const milkPriceField = screen.getByLabelText(/Milk Price/);
            const startingDateField = screen.getByLabelText(/Starting Date/);
            const degradationRateField = screen.getByLabelText(/Degradation Rate/);
            const showLeaderboardField = screen.getByLabelText(/Show Leaderboard\?/);

            expect(nameField).toHaveValue("Seths Common");
            expect(startingDateField).toHaveValue("2022-03-05");
            expect(startingBalanceField).toHaveValue(1200);
            expect(cowPriceField).toHaveValue(15);
            expect(milkPriceField).toHaveValue(10);
            expect(degradationRateField).toHaveValue(20.3);
            expect(showLeaderboardField).not.toBeChecked();
        });

        test("Changes when you click Update", async () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <AdminEditCommonsPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            expect(await screen.findByLabelText(/Commons Name/)).toBeInTheDocument();

            const nameField = screen.getByLabelText(/Commons Name/);
            const startingBalanceField = screen.getByLabelText(/Starting Balance/);
            const cowPriceField = screen.getByLabelText(/Cow Price/);
            const milkPriceField = screen.getByLabelText(/Milk Price/);
            const startingDateField = screen.getByLabelText(/Starting Date/);
            const degradationRateField = screen.getByLabelText(/Degradation Rate/);
            const showLeaderboardField = screen.getByLabelText(/Show Leaderboard\?/);

            expect(nameField).toHaveValue("Seths Common");
            expect(startingDateField).toHaveValue("2022-03-05");
            expect(startingBalanceField).toHaveValue(1200);
            expect(cowPriceField).toHaveValue(15);
            expect(milkPriceField).toHaveValue(10);
            expect(degradationRateField).toHaveValue(20.3);
            expect(showLeaderboardField).not.toBeChecked();

            const submitButton = screen.getByText("Update");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(nameField, { target: { value: "Phill's Commons" } })
            fireEvent.change(startingDateField, { target: { value: "2022-03-07" } })
            fireEvent.change(startingBalanceField, { target: { value: 1400 } })
            fireEvent.change(cowPriceField, { target: { value: 200 } })
            fireEvent.change(milkPriceField, { target: { value: 5 } })
            fireEvent.change(degradationRateField, { target: { value: 40.3 } })
            fireEvent.click(showLeaderboardField)

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toHaveBeenCalled());
            expect(mockToast).toBeCalledWith("Commons Updated - id: 5 name: Phill's Commons");
            expect(mockNavigate).toBeCalledWith({ "to": "/admin/listcommons" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 5 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                "name": "Phill's Commons",
                "startingBalance": 1400,
                "cowPrice": 200,
                "milkPrice": 5,
                "startingDate": "2022-03-07T00:00:00.000Z",
                "degradationRate": 40.3,
                "showLeaderboard": true,
            })); // posted object
        });
    });
});
