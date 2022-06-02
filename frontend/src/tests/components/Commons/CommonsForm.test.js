import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommonsForm from "main/components/Commons/CommonsForm";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("CommonsForm tests", () => {
  it("renders correctly", async () => {
    render(
      <Router >
        <CommonsForm />
      </Router>
    );

    expect(await screen.findByText(/Commons Name/)).toBeInTheDocument();

    [
      /Starting Balance/,
      /Cow Price/,
      /Milk Price/,
      /Starting Date/,
      /Show Leaderboard\?/,
    ].forEach(
      (pattern) => {
        expect(screen.getByText(pattern)).toBeInTheDocument();
      }
    );
    expect(screen.getByText(/Create/)).toBeInTheDocument();
  });


  it("has validation errors for required fields", async () => {
    const submitAction = jest.fn();

    render(
      <Router  >
        <CommonsForm submitAction={submitAction} buttonLabel="Create" />
      </Router  >
    );

    expect(await screen.findByTestId("CommonsForm-name")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(await screen.findByText(/commons name is required/i)).toBeInTheDocument();

    expect(screen.getByText(/starting balance is required/i)).toBeInTheDocument();
    expect(screen.getByText(/cow price is required/i)).toBeInTheDocument();
    expect(screen.getByText(/milk price is required/i)).toBeInTheDocument();
    expect(screen.getByText(/starting date is required/i)).toBeInTheDocument();

    expect(submitAction).not.toBeCalled();
  });
});
