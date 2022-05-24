import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, act } from '@testing-library/react-hooks'
import { toast } from "react-toastify";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useBackend, useBackendMutation } from "main/utils/useBackend";


jest.mock('react-router-dom');

const mockToast = jest.spyOn(toast, 'error').mockImplementation();


describe("utils/useBackend tests", () => {
    describe("utils/useBackend useBackend tests", () => {

        test("test useBackend handles 404 error correctly", async () => {

            jest.spyOn(console, 'error')
            console.error.mockImplementation(() => null);

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

            axiosMock.onGet("/api/admin/users").reply(404, { message: "Error: Request failed with status code 404" });

            const { result, waitFor } = renderHook(() => useBackend(
                ["/api/admin/users"],
                { method: "GET", url: "/api/admin/users" },
                ["initialData"]
            ), { wrapper });

            await waitFor(() => result.current.isError);

            expect(result.current.data).toEqual(["initialData"]);
            await waitFor(() => expect(mockToast).toHaveBeenCalledTimes(1));
            expect(mockToast).toHaveBeenCalledWith("Error: Request failed with status code 404");

            console.error.mockRestore()
        });

        test("test useBackend handles 404 error with no message", async () => {

            jest.spyOn(console, 'error')
            console.error.mockImplementation(() => null);

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

            axiosMock.onGet("/api/admin/users").reply(404);

            const { result, waitFor } = renderHook(() => useBackend(
                ["/api/admin/users"],
                { method: "GET", url: "/api/admin/users" },
                ["initialData"]
            ), { wrapper });

            await waitFor(() => result.current.isError);

            expect(result.current.data).toEqual(["initialData"]);
            await waitFor(() => expect(mockToast).toHaveBeenCalledTimes(1));
            expect(mockToast).toHaveBeenCalledWith("Error communicating with backend via GET on /api/admin/users");

            console.error.mockRestore()
        });

    });
    describe("utils/useBackend useBackendMutation tests", () => {
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

        });

        test("test useBackendMutation handles error correctly with response message", async () => {
            
            jest.spyOn(console, 'error')
            console.error.mockImplementation(() => null);
            
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
            axiosMock.onPost("/api/ucsbdates/post").reply(404, { message: "Error: Request failed with status code 404" });

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
            });

            await waitFor(() => expect(mockToast).toHaveBeenCalledTimes(1));
            expect(mockToast).toHaveBeenCalledWith("Error: Request failed with status code 404");

            console.error.mockRestore()

        });
        test("test useBackendMutation handles error correctly with no response message", async () => {

            jest.spyOn(console, 'error')
            console.error.mockImplementation(() => null);

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

            });
            await waitFor(() => expect(mockToast).toHaveBeenCalledTimes(1));
            expect(mockToast).toHaveBeenCalledWith("Error communicating with backend via post on /api/ucsbdates/post");
            
            console.error.mockRestore()

        });
    });
});