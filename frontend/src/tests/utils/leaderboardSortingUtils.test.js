import { sortByWealth, sortByNumCows, sortByCowHealth } from "../../main/utils/leaderboardSortingUtils"
import userCommonsFixtures from "../../fixtures/userCommonsFixtures"

describe("leaderboardSortingUtils tests", () => {
  const {
    _oneUserCommons,
    _threeUserCommons,
    fiveUserCommons,
    tenUserCommons
  } = userCommonsFixtures;

//-----------------------------//
//        Wealth Tests
//----------------------------//
  test("sortByWealth", () => {
    const sortedUserCommons = sortByWealth(fiveUserCommons);
    const expectedWealths = [100000, 1000, 1000, 800, 50];
    for (let i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  test("sortByWealthReturnOne", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 1);
    expect(sortedUserCommons.length).toBe(1);
    expect(sortedUserCommons[0].totalWealth).toBe(100000);
  });

  test("sortByWealthReturnThree", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 3);
    expect(sortedUserCommons.length).toBe(3);
    const expectedWealths = [100000, 100000, 1000];
    for (let i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByWealthExpectTooMany", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedWealths = [100000, 100000, 1000, 1000, 1000, 1000, 800, 800, 50, 50];
    for (let i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  //-----------------------------//
  //      Num Cows Tests
  //----------------------------//

  test("sortByNumCows", () => {
    const sortedUserCommons = sortByNumCows(fiveUserCommons);
    const expectedNumCows = [1000, 100, 60, 8, 5];
    for (let i in expectedNumCows){
      expect(sortedUserCommons[i].numOfCows).toBe(expectedNumCows[i]);
    }
  });

  test("sortByNumCowsReturnOne", () => {
    const sortedUserCommons = sortByNumCows(tenUserCommons, 1);
    expect(sortedUserCommons.length).toBe(1);
    expect(sortedUserCommons[0].numOfCows).toBe(1000);
  });

  test("sortByNumCowsReturnThree", () => {
    const sortedUserCommons = sortByNumCows(tenUserCommons, 3);
    expect(sortedUserCommons.length).toBe(3);
    const expectedNumCows = [1000, 1000, 100];
    for (let i in expectedNumCows){
      expect(sortedUserCommons[i].numOfCows).toBe(expectedNumCows[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByNumCowsExpectTooMany", () => {
    const sortedUserCommons = sortByNumCows(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedNumCows = [1000, 1000, 100, 100, 60, 60, 8, 8, 5, 5];
    for (let i in expectedNumCows){
      expect(sortedUserCommons[i].numOfCows).toBe(expectedNumCows[i]);
    }
  });

  //-----------------------------//
  //      Cow Health Tests
  //----------------------------//
  // if tests fail due to floating point error, try using .toBeCloseTo(number, numDigits?) instead of .toBe()

  test("sortByCowHealth", () => {
    const sortedUserCommons = sortByCowHealth(fiveUserCommons);
    const expectedCowHealths = [98.0, 93.0, 84.0, 72.0, 2.0];
    for (let i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });

  test("sortByCowHealthReturnOne", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 1);
    expect(sortedUserCommons.length).toBe(1);
    expect(sortedUserCommons[0].cowHealth).toBe(98.0);
  });

  test("sortByCowHealthReturnThree", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 3);
    expect(sortedUserCommons.length).toBe(3);
    const expectedCowHealths = [98.0, 98.0, 93.0];
    for (let i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByCowHealthExpectTooMany", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedCowHealths = [98.0, 98.0, 93.0, 93.0, 84.0, 84.0, 72.0, 72.0, 2.0, 2.0, ];
    for (let i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });


})
