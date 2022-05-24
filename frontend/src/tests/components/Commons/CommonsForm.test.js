import { act, render, screen, waitFor, fireEvent } from "@testing-library/react";
import CommonsForm from "main/components/Commons/CommonsForm";
import { BrowserRouter as Router } from "react-router-dom";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe(CommonsForm, () => {


  it("renders correctly ", async () => {
    const { getByText } = render(
      <Router >
        <CommonsForm />
      </Router>
    );
    await waitFor(() => expect(getByText(/Commons Name/)).toBeInTheDocument());
    [
      /Starting Balance/,
      /Cow Price/,
      /Milk Price/,
      /Starting Date/,

    ].forEach(
      (pattern) => {
        expect(getByText(pattern)).toBeInTheDocument();
      }
    );
    expect(getByText(/Create/)).toBeInTheDocument();
  });


  it("has validation errors for required fields", async () => {
    const submitAction = jest.fn();

    const { getByTestId, getByText } = render(
      <Router  >
        <CommonsForm submitAction={submitAction} buttonLabel="Create" />
      </Router  >
    );

    await waitFor(() => expect(getByTestId("CommonsForm-name")).toBeInTheDocument());
    const submitButton = getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText(/commons name is required/i)).toBeInTheDocument());

    expect(getByText(/starting balance is required/i)).toBeInTheDocument();
    expect(getByText(/cow price is required/i)).toBeInTheDocument();
    expect(getByText(/milk price is required/i)).toBeInTheDocument();
    expect(getByText(/starting date is required/i)).toBeInTheDocument();

    expect(submitAction).not.toBeCalled();
  });

});


