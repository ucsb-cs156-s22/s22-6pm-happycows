import { renderHook } from '@testing-library/react-hooks';
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";

import { useUsers } from "main/utils/users";
import usersFixtures from "fixtures/usersFixtures";

jest.mock('react-router-dom');

describe("utils/users tests", () => {
    describe("useUsers tests", () => {
        test("useUsers initially retrieves initial data on timeout", async () => {
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            var axiosMock = new AxiosMockAdapter(axios);
            axiosMock.onGet("/api/admin/users").timeout();

            const restoreConsole = mockConsole();

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });

            await waitFor(() => result.current.isSuccess);
            expect(result.current.data).toEqual([]);

            const queryState = queryClient.getQueryState("users");
            expect(queryState).toBeDefined();

            await waitFor(() => expect(console.error).toHaveBeenCalled());
            const errorMessage = console.error.mock.calls[0][0];
            expect(errorMessage).toMatch("Error getting data from /api/admin/users:");
            restoreConsole();
        });

        test("useUsers hits error logic on 404", async () => {
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            var axiosMock = new AxiosMockAdapter(axios);
            axiosMock.onGet("/api/admin/users").reply(404);

            const restoreConsole = mockConsole();

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });
            await waitFor(() => result.current.isFetched);
            expect(console.error).toHaveBeenCalled();
            restoreConsole();

            expect(result.current.data).toEqual([]);
        });

        test("useUsers returns correct data when api is mocked", async () => {
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );
            var axiosMock = new AxiosMockAdapter(axios);
            axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);

            const { result, waitFor } = renderHook(() => useUsers(), { wrapper });
            await waitFor(() => result.current.isFetched);
            expect(result.current.data).toEqual(usersFixtures.threeUsers);
        });
    });
});
