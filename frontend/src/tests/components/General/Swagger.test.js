import React from "react";
import { render, waitFor } from "@testing-library/react";
import Swagger from "main/components/General/Swagger";
import swaggerFixtures from "fixtures/swaggerFixtures";

import fetchMock from "jest-fetch-mock";

// See: https://www.leighhalliday.com/mock-fetch-jest
fetchMock.enableMocks();

describe("Swagger component tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("it should render without crashing", () => {
    render(<Swagger />);
  });

  test("it should contain the right content", async () => {
    fetch.mockResponseOnce(JSON.stringify(swaggerFixtures.example));

    const { getAllByText } = render(<Swagger />);
    await waitFor(() =>
      expect(getAllByText(/Api Documentation/)[0]).toBeInTheDocument()
    );
    expect(fetch.mock.calls[0][0]).toBe("/api/docs");
  });
});
