import { render } from "@testing-library/react";
import usersFixtures from "fixtures/usersFixtures";
import UsersTable from "main/components/Users/UsersTable"


describe("UserTable tests", () => {

    test("renders without crashing for empty table", () => {
        render(
            <UsersTable users={[]} />
        );
    });

    test("renders without crashing for three users", () => {
        render(
            <UsersTable users={usersFixtures.threeUsers} />
        );
    });

    test("Has the expected colum headers and content", () => {
        const { getByText, getByTestId } = render(
          <UsersTable users={usersFixtures.threeUsers}/>
        );
    
        const expectedHeaders = ["id", "First Name", "Last Name", "Email", "Admin"];
        const expectedFields = ["id", "givenName", "familyName", "email", "admin"];
        const testId = "UsersTable";

        expectedHeaders.forEach( (headerText)=> {
            const header = getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach( (field)=> {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(getByTestId(`${testId}-cell-row-0-col-admin`)).toHaveTextContent("true");
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-1-col-admin`)).toHaveTextContent("false");

      });
});

