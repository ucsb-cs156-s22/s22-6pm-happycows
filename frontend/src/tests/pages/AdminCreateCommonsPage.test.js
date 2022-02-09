import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import AdminCreateCommonsPage from "main/pages/AdminCreateCommonsPage";

describe("AdminUsersPage tests",  () => {
    const queryClient = new QueryClient();
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

});
