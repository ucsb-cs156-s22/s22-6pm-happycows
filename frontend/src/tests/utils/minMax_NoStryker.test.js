import { arrayMin, arrayMax } from "main/utils/minMax_NoStryker";

describe("minMax_NoStryker tests", () => {
  test("arrayMin returns min value of array", () => {
    expect(arrayMin([1])).toBe(1);
    expect(arrayMin([1, 1])).toBe(1);
    expect(arrayMin([2, 1])).toBe(1);
    expect(arrayMin([1, 2])).toBe(1);
    expect(arrayMin([3, 2, 1])).toBe(1);
    expect(arrayMin([1, 2, 3])).toBe(1);
  });
  test("arrayMax returns max value of array", () => {
    expect(arrayMax([1])).toBe(1);
    expect(arrayMax([1, 1])).toBe(1);
    expect(arrayMax([2, 1])).toBe(2);
    expect(arrayMax([1, 2])).toBe(2);
    expect(arrayMax([3, 2, 1])).toBe(3);
    expect(arrayMax([1, 2, 3])).toBe(3);
  });
});
