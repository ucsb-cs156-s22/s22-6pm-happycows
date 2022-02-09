import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateCommonsForm from "main/components/Commons/CreateCommonsForm";

describe(CreateCommonsForm, () => {
  it("has validation errors for required fields", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<CreateCommonsForm onSubmit={onSubmit} />));

    userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(/commons name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/starting balance is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/cow price is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/milk price is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/start date is required/i)).toBeInTheDocument();

    expect(onSubmit).not.toBeCalled();
  });

  it("calls the onSubmit callback with valid inputs", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<CreateCommonsForm onSubmit={onSubmit} />));

    userEvent.type(screen.getByLabelText(/commons name/i), "Test");
    userEvent.type(screen.getByLabelText(/starting balance/i), "1000.00");
    userEvent.type(screen.getByLabelText(/cow price/i), "99.95");
    userEvent.type(screen.getByLabelText(/milk price/i), "5.99");
    userEvent.type(screen.getByLabelText(/start date/i), "2021-01-01");
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: "Test",
      startingBalance: 1000.00,
      cowPrice: 99.95,
      milkPrice: 5.99,
      startDate: new Date("2021-01-01"),
    });
  });
});


