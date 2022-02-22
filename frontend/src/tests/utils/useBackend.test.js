import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, act } from '@testing-library/react-hooks'
import mockConsole from "jest-mock-console";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useBackend, useBackendMutation } from "main/utils/useBackend";


jest.mock('react-router-dom');

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});


describe("utils/useBackend tests", () => {
    describe("utils/useBackend useBackend tests", () => {

        test("test useBackend handles 404 error correctly", async () => {

            // See: https://react-query.tanstack.com/guides/testing#turn-off-retries
            const queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        // ✅ turns retries off
                        retry: false,
                    },
                },
            })
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            var axiosMock = new AxiosMockAdapter(axios);

            axiosMock.onGet("/api/admin/users").reply(404, {});

            const restoreConsole = mockConsole();

            const { result, waitFor } = renderHook(() => useBackend(
                ["/api/admin/users"],
                { method: "GET", url: "/api/admin/users" },
                ["initialData"]
            ), { wrapper });

            await waitFor(() => result.current.isError);

            expect(result.current.data).toEqual(["initialData"]);
            await waitFor(() => expect(console.error).toHaveBeenCalled());
            const errorMessage = console.error.mock.calls[0][0];
            expect(errorMessage).toMatch("Error communicating with backend via GET on /api/admin/users");
            restoreConsole();

        });
    });
    describe("utils/useBackend useBackend tests", () => {
        test("test useBackendMutation handles success correctly", async () => {

            // See: https://react-query.tanstack.com/guides/testing#turn-off-retries
            const queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        // ✅ turns retries off
                        retry: false,
                    },
                },
            })
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            var axiosMock = new AxiosMockAdapter(axios);

            axiosMock.onPost("/api/ucsbdates/post").reply(202, {
                id: 17,
                quarterYYYYQ: '20221',
                name: 'Groundhog Day',
                localDateTime: '2022-02-02T12:00'

            });
            // axiosMock.onPost("/api/ucsbdate/post").timeout();


            // const restoreConsole = mockConsole();

            const objectToAxiosParams = (ucsbDate) => ({
                url: "/api/ucsbdates/post",
                method: "POST",
                params: {
                    quarterYYYYQ: ucsbDate.quarterYYYYQ,
                    name: ucsbDate.name,
                    localDateTime: ucsbDate.localDateTime
                }
            });

            const onSuccess = jest.fn().mockImplementation((ucsbDate) => {
                mockToast(`New ucsbDate Created - id: ${ucsbDate.id} name: ${ucsbDate.name}`);
            });

            const { result, waitFor } = renderHook(
                () => useBackendMutation(objectToAxiosParams, { onSuccess }, ["/api/ucsbdates/all"]), { wrapper }
            );

            const mutation = result.current;
            act(() => mutation.mutate({
                quarterYYYYQ: '20221',
                name: 'Groundhog Day',
                localDateTime: '2022-02-02T12:00'
            }));


            await waitFor(() => expect(onSuccess).toHaveBeenCalled());
            expect(mockToast).toHaveBeenCalledWith("New ucsbDate Created - id: 17 name: Groundhog Day");

            // const errorMessage = console.error.mock.calls[0][0];
            // expect(errorMessage).toMatch("Fake");
            // restoreConsole();


        });
        test("test useBackendMutation handles error correctly", async () => {

            const restoreConsole = mockConsole();


            // See: https://react-query.tanstack.com/guides/testing#turn-off-retries
            const queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        // ✅ turns retries off
                        retry: false,
                    },
                },
            })
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );

            const axiosMock = new AxiosMockAdapter(axios);
            axiosMock.onPost("/api/ucsbdates/post").reply(404);

            const objectToAxiosParams = (ucsbDate) => ({
                url: "/api/ucsbdates/post",
                method: "POST",
                params: {
                    quarterYYYYQ: ucsbDate.quarterYYYYQ,
                    name: ucsbDate.name,
                    localDateTime: ucsbDate.localDateTime
                }
            });

            const onSuccess = jest.fn().mockImplementation((ucsbDate) => {
                mockToast(`New ucsbDate Created - id: ${ucsbDate.id} name: ${ucsbDate.name}`);
            });


            const { result, waitFor } = renderHook(
                () => useBackendMutation(objectToAxiosParams, { onSuccess }), { wrapper }
            );

            const mutation = result.current;

            mutation.mutate({
                quarterYYYYQ: '20221',
                name: 'Groundhog Day',
                localDateTime: '2022-02-02T12:00'
            }, {
                onError: (e) => console.error("onError from mutation.mutate called!", String(e).substring(0, 199))
            });

            await waitFor(() => expect(mockToast).toHaveBeenCalled());
            expect(mockToast).toHaveBeenCalledTimes(2);
            expect(mockToast).toHaveBeenCalledWith("Axios Error: Error: Request failed with status code 404");
            expect(mockToast).toHaveBeenCalledWith("Error: Request failed with status code 404");

            expect(console.error).toHaveBeenCalledTimes(2);
            const errorMessage0 = console.error.mock.calls[0][0];
            expect(errorMessage0).toMatch(/Axios Error:/);
            const errorMessage1 = console.error.mock.calls[1][0];
            expect(errorMessage1).toMatch(/onError from mutation.mutate/);

            restoreConsole();
        });
    });
});