import { sortByWealth, sortByNumCows, sortByCowHealth } from "../../main/utils/leaderboardSortingUtils"
import userCommonsFixtures from "../../fixtures/userCommonsFixtures"

describe("leaderboardSortingUtils tests", () => {
  const {
    oneUserCommons,
    threeUserCommons,
    fiveUserCommons,
    tenUserCommons
  } = userCommonsFixtures;

//-----------------------------//
//        Wealth Tests
//----------------------------//
  test("sortByWealth", () => {
    const sortedUserCommons = sortByWealth(fiveUserCommons);
    const expectedWealths = [100000, 1000, 1000, 800, 50];
    for (i in expectedWealths){
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
    for (i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByWealthExpectTooMany", () => {
    const sortedUserCommons = sortByWealth(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedWealths = [100000, 100000, 1000, 1000, 1000, 1000, 800, 800, 50, 50];
    for (i in expectedWealths){
      expect(sortedUserCommons[i].totalWealth).toBe(expectedWealths[i]);
    }
  });

  //-----------------------------//
  //      Cow Health Tests
  //----------------------------//

  test("sortByCowHealth", () => {
    const sortedUserCommons = sortByCowHealth(fiveUserCommons);
    const expectedCowHealths = [98.0, 93.0, 84.0, 72.0, 2.0];
    for (i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });

  test("sortByCowHealthReturnOne", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 1);
    expect(sortedUserCommons.length).toBe(1);
    expect(sortedUserCommons[0].cowHealth).toBe(100000);
  });

  test("sortByCowHealthReturnThree", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 3);
    expect(sortedUserCommons.length).toBe(3);
    const expectedCowHealths = [100000, 100000, 1000];
    for (i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });

  // Expected behavior here is to just return the full sorted array of userCommons
  test("sortByCowHealthExpectTooMany", () => {
    const sortedUserCommons = sortByCowHealth(tenUserCommons, 25);
    expect(sortedUserCommons.length).toBe(tenUserCommons.length);
    const expectedCowHealths = [100000, 100000, 1000, 1000, 1000, 1000, 800, 800, 50, 50];
    for (i in expectedCowHealths){
      expect(sortedUserCommons[i].cowHealth).toBe(expectedCowHealths[i]);
    }
  });


})
