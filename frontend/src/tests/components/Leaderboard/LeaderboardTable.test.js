import {  render } from "@testing-library/react";
import userCommonsFixtures from "fixtures/userCommonsFixtures";
import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("LeaderboardTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable leaderboardUsers={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable leaderboardUsers={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable leaderboardUsers={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable leaderboardUsers={userCommonsFixtures.threeUserCommons} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );


    const expectedHeaders = ['Full Name',  'Total Wealth', 'Cows Owned','Cow Health'];
    const expectedFields = ['user.fullName', 'totalWealth','numOfCows', 'cowHealth'];
    const testId = "LeaderboardTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-user.fullName`)).toHaveTextContent("George Washington");
    expect(getByTestId(`${testId}-cell-row-0-col-totalWealth`)).toHaveTextContent("1000");
    expect(getByTestId(`${testId}-cell-row-1-col-user.fullName`)).toHaveTextContent("John Adams");
    expect(getByTestId(`${testId}-cell-row-1-col-totalWealth`)).toHaveTextContent("1000");

  });

});

