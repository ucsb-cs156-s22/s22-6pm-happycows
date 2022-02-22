import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { useNavigate } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import AdminCreateCommonsPage from "main/pages/AdminCreateCommonsPage";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const mockedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => mockedNavigate
// }));

const mockedMutate = jest.fn();

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useMutation: () => ({mutate: mockedMutate})
}));

describe("AdminCreateCommonsPage tests",  () => {

    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();


    beforeEach(()=>{
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", async () => {

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <MemoryRouter>
                        <AdminCreateCommonsPage />
                    </MemoryRouter>
                </ToastProvider>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Create Commons")).toBeInTheDocument());

    });

    test("When you fill in form and click submit, the right things happens", async () => {

        const { getByText, getByLabelText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <MemoryRouter>
                        <AdminCreateCommonsPage />
                    </MemoryRouter>
                </ToastProvider>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Create Commons")).toBeInTheDocument());

        const commonsNameField = getByLabelText("Commons Name");
        const startingBalanceField = getByLabelText("Starting Balance");
        const cowPriceField = getByLabelText("Cow Price");
        const milkPriceField = getByLabelText("Milk Price");
        const startDateField = getByLabelText("Start Date");
        const button = getByTestId("CreateCommonsForm-Create-Button");


        fireEvent.change(commonsNameField, {target: {value: 'My New Commons'}})
        fireEvent.change(startingBalanceField, {target: {value: '500'}})
        fireEvent.change(cowPriceField, {target: {value: '10'}})
        fireEvent.change(milkPriceField, {target: {value: '5'}})
        fireEvent.change(startDateField, {target: {value: '2022-05-12'}})
        fireEvent.click(button);

        await waitFor(() => expect(mockedMutate).toHaveBeenCalledTimes(1));

    });

});
