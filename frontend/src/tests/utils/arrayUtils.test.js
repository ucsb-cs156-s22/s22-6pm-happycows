import { getFirstSmallestLargest } from "main/utils/arrayUtils";

describe("arrayUtils tests", () => {
  const states = [
    {
      abbr: "CA",
      name: "California",
      symbols: {
        bird: "California Quail",
        flower: "California Poppy",
      },
    },
    {
      abbr: "OR",
      name: "Oregon",
      symbols: {
        bird: "Western Meadowlark",
        flower: "Oregon Grape",
      },
    },
    {
      abbr: "NV",
      name: "Nevada",
      symbols: {
        bird: "Mountain Bluebird",
        flower: "Big Sagebrush",
      },
    },
    {
      abbr: "AK",
      name: "Alaska",
      symbols: {
        bird: "Willow ptarmigan",
        flower: "Forget-me-not",
      },
    },
  ];

  test("getFirstSmallestLargest abbr", () => {
    const { first, smallest, largest } = getFirstSmallestLargest(
      states,
      (s) => s.abbr
    );
    expect(first).toBe("CA");
    expect(smallest).toBe("AK");
    expect(largest).toBe("OR");
  });

  test("getFirstSmallestLargest name", () => {
    const { first, smallest, largest } = getFirstSmallestLargest(
      states,
      (s) => s.name
    );
    expect(first).toBe("California");
    expect(smallest).toBe("Alaska");
    expect(largest).toBe("Oregon");
  });

  test("getFirstSmallestLargest symbols.bird", () => {
    const { first, smallest, largest } = getFirstSmallestLargest(
      states,
      (s) => s.symbols.bird
    );
    expect(first).toBe("California Quail");
    expect(smallest).toBe("California Quail");
    expect(largest).toBe("Willow ptarmigan");
  });

  test("getFirstSmallestLargest symbols.flower", () => {
    const { first, smallest, largest } = getFirstSmallestLargest(
      states,
      (s) => s.symbols.flower
    );
    expect(first).toBe("California Poppy");
    expect(smallest).toBe("Big Sagebrush");
    expect(largest).toBe("Oregon Grape");
  });
});
